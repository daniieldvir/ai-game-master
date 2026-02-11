import { useState, useEffect, useRef } from 'react';
import CloseIcon from '../../assets/SVG/close.svg';
import type { Character } from '../../types/gameTypes';
import { CHARACTER_IMAGES, getCharacterImage, type CharacterClass, type Gender } from '../../utils/characterImages';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';
import './CharacterCreation.scss';

type Props = {
    onCreateCharacter: (character: Character) => void;
    onClose: () => void;
};

export default function CharacterCreation({ onCreateCharacter, onClose }: Props) {
    const [name, setName] = useState('');
    const [charClass, setCharClass] = useState<CharacterClass>('Warrior');
    const [gender, setGender] = useState<Gender>('Female');
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        // Force focus on mount
        inputRef.current?.focus();
    }, []);

    const classes = Object.keys(CHARACTER_IMAGES) as CharacterClass[];


    const submit = () => {
        onCreateCharacter({
            name,
            class: charClass,
            gender,
            image: getCharacterImage(charClass, gender),
        });
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
                    <label>How shall we call you?</label>
                    <Input
                        type="text"
                        placeholder="Enter hero name..."
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        maxLength={15}
                        ref={inputRef}
                    />
                </div>

                <div className="form-group">
                    <label>Choose your path</label>

                    <div className="gender-selection">
                        <button
                            className={`gender-btn ${gender === 'Male' ? 'active' : ''}`}
                            onClick={() => setGender('Male')}
                        >
                            Male
                        </button>
                        <button
                            className={`gender-btn ${gender === 'Female' ? 'active' : ''}`}
                            onClick={() => setGender('Female')}
                        >
                            Female
                        </button>
                    </div>

                    <div className="select-wrapper">
                        <select value={charClass} onChange={(e) => setCharClass(e.target.value as CharacterClass)}>
                            {classes.map((c) => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
                    </div>

                    <div className="character-preview">
                        <img
                            src={getCharacterImage(charClass, gender)}
                            alt={charClass}
                            key={`${charClass}-${gender}`}
                            className="preview-image"
                        />
                    </div>


                </div>

                <Button onClick={submit} disabled={!name || !charClass} >
                    Begin Your Saga
                </Button>
            </div>
        </div>
    );
}
