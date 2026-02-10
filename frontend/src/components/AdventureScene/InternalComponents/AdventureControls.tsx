import Button from "../../UI/Button/Button";
import Input from "../../UI/Input/Input";
import './AdventureControls.scss';

type Props = {
    options: string[];
    userInput: string;
    inputRef?: React.Ref<HTMLInputElement>;
    loading: boolean;
    setUserInput: (input: string) => void;
    handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    onSend: (input: string) => void;
}
export default function AdventureControls({ options, userInput, inputRef, loading, onSend, setUserInput, handleKeyDown  }: Props) {
    return (
        <div className="adventure-controls">
            {options.length > 0 && (
                <div className="options-grid">
                    {options.map((option, index) => (
                        <Button key={index} onClick={() => onSend(option)}>
                            {option}
                        </Button>
                    ))}
                </div>
            )}

            <div className="user-input-container">
                <Input
                    ref={inputRef}
                    className="user-input"
                    type="text"
                    placeholder="What is your next move?..."
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <Button onClick={() => onSend(userInput)} disabled={loading || !userInput.trim()}>
                    Send
                </Button>
            </div>
        </div>)
}