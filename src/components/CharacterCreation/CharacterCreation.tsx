import { useState } from 'react';
import type { Character } from '../../types/gameTypes';
import Button from '../UI/Button/Button';
import './CharacterCreation.scss';
import CloseIcon from '../../assets/SVG/close.svg';
import Input from '../UI/Input/Input';

type Props = {
    onCreateCharacter: (character: Character) => void;
    onClose: () => void;
};

export default function CharacterCreationModal({ onCreateCharacter, onClose }: Props) {
    const [name, setName] = useState('');
    const [charClass, setCharClass] = useState('Warrior');
    const classes = ['Warrior', 'Mage', 'Rogue', 'Paladin', 'Druid'];

    const submit = () => {
        onCreateCharacter({ name, class: charClass });
    };



    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={onClose} aria-label="Close modal">
                    <img src={CloseIcon} alt="Close" />
                </button>

                <div className="modal-header">
                    <h2>Create Your Hero</h2>
                </div>

                <div className="form-group">
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', opacity: 0.7 }}>How shall we call you?</label>
                    <Input
                        type="text"
                        placeholder="Enter hero name..."
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', opacity: 0.7 }}>Choose your path</label>
                    <div className="select-wrapper">
                        <select value={charClass} onChange={(e) => setCharClass(e.target.value)}>
                            {classes.map((c) => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <Button onClick={submit} disabled={!name || !charClass} >
                    Begin Your Saga
                </Button>
            </div>
        </div>
    );
}
