import * as React from "react";
import { infectionRate } from "../core/selectors";
import { Config, Game, Stack, State } from "../core/types";
import { configure, epidemic, infect, remove, undo, update } from "../core/updaters";
import { DialogService, RouteService, StorageService } from "../util/services";
import { size } from "../util/stacks";
import { Dashboard } from "./dashboard";
import { Debug } from "./debug";
import { Infect } from "./infect";
import { Routes } from "./routes";
import { Settings } from "./settings";

export interface Services {
    dialog: DialogService;
    route: RouteService;
    storage: StorageService;
}

export interface Props {
    location: string;
    namespace: string;
    services: Services;
}

export class Application extends React.PureComponent<Props, State> {
    public static displayName = "Application";

    private static _currentGame(state: State): Game {
        return state.games[state.games.length - 1];
    }

    public state = this._initialState();

    public render() {
        const { location } = this.props;
        if (this.state.games.length === 0 || location === Routes.Settings) {
            return (
                <Settings
                    config={this.state.config}
                    onConfigure={this._onConfigure}
                    services={this.props.services}
                />
            );
        }
        const game = Application._currentGame(this.state);
        if (game.turns === -1 || location === Routes.Infect) {
            return <Infect game={game} onInfect={this._onInfect} />;
        }
        if (location === Routes.Debug) {
            return <Debug state={this.state} />;
        }
        return (
            <Dashboard
                game={game}
                onEpidemic={this._onEpidemic}
                onRemove={this._onRemove}
                onUndo={this._onUndo}
            />
        );
    }

    public componentDidUpdate() {
        this.props.services.storage.setItem(this.props.namespace, JSON.stringify(this.state));
    }

    private _initialState(): State {
        const data = this.props.services.storage.getItem(this.props.namespace);
        return data !== null
            ? JSON.parse(data)
            : {
                  config: {
                      cards: 0,
                      epidemics: 0,
                      cities: {},
                  },
                  games: [],
              };
    }

    private _onConfigure = (config: Config): boolean => {
        if (config.cards <= 0) {
            return this._alert(`Cannot create a game with ${config.cards} in the player deck.`);
        }
        if (config.epidemics <= 0) {
            return this._alert(`Cannot create a game with ${config.epidemics} epidemics.`);
        }
        if (config.cards < config.epidemics) {
            return this._alert(
                `Cannot create a game with fewer cards in the player deck than epidemics.`,
            );
        }
        if (size(config.cities) === 0) {
            return this._alert(`Cannot create a game with no infection cards.`);
        }
        const response = this.props.services.dialog.confirm("Start new game?");
        if (!response) {
            return response;
        }
        this.setState({ config, games: [configure(config)] });
        return true;
    };

    private _onEpidemic = (city: string) => {
        this.setState(update(this.state, epidemic(Application._currentGame(this.state), city)));
        this.props.services.route.routeTo(Routes.Infect);
    };

    private _onRemove = (city: string) => {
        this.setState(update(this.state, remove(Application._currentGame(this.state), city)));
    };

    private _onInfect = (cities: Stack): boolean => {
        const game = Application._currentGame(this.state);
        const total = size(cities);
        const count = Object.keys(cities).length;
        const rate = infectionRate(game);
        const messages: string[] = [
            `Continue with ${total} ${total > 1 ? "infections" : "infection"} in ${count} ${
                count > 1 ? "cities" : "city"
            }?`,
        ];
        if (total !== rate) {
            messages.push(`Warning: ${total} is not the current infection rate of ${rate}.`);
        }
        const response = this.props.services.dialog.confirm(messages.join("\n\n"));
        if (!response) {
            return false;
        }
        this.setState(update(this.state, infect(game, cities)));
        return true;
    };

    private _onUndo = () => {
        if (this.state.games.length < 2) {
            this._alert("Cannot undo any more actions.");
            return;
        }
        this.setState(undo);
    };

    private _alert(msg: string): boolean {
        this.props.services.dialog.alert(msg);
        return false;
    }
}
