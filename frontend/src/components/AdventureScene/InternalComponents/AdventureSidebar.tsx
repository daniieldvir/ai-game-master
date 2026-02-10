import { useMemo } from "react";
import type { Character, HistoryEntry } from "../../../types/gameTypes";
import Progressbar from "../../UI/Progressbar/Progressbar";
import './AdventureSidebar.scss';

type Props = {
    character: Character;
    hp: number;
    world: string;
    history: HistoryEntry[];
    onLeave: () => void;
};

export default function AdventureSidebar({ character, hp, world, history, onLeave }: Props) {
    const reversedHistory = useMemo(() => [...history].reverse(), [history]);

    return (
        <aside className="adventure-sidebar">
            <div className="stat-card">
                <h3>Active Hero</h3>
                <div className="hero-name">{character.name}</div>
                <div className="hero-class">{character.class}</div>

                <div className="hp-bar-container">
                    <div className="hp-label">
                        <span>Vitality</span>
                        <span>{hp}/100</span>
                    </div>
                    <Progressbar hp={hp} />
                </div>

                <div className="world-info">
                    <span>📍</span> {world}
                </div>
            </div>

            <div className="history-card">
                <h3>Adventure Log</h3>
                {history.length === 0 && (
                    <p className="empty-history">Your journey has just begun...</p>
                )}
                {reversedHistory.map((item, idx) => (
                    <div key={idx} className="history-item">
                        <span className="history-action">➜ {item.userInput}</span>
                        <span className="history-scene-preview">
                            {item.scene}
                        </span>
                    </div>
                ))}
            </div>

            <button className="leave-button" onClick={onLeave}>
                Retire Hero
            </button>
        </aside>
    );
}