import Button from '../UI/Button/Button';
import './SummaryScreen.scss';

type Props = {
  summary: string;
  onRetryPath: () => void;
  onNewGame: () => void;
};

export default function SummaryScreen({ summary, onRetryPath, onNewGame }: Props) {
  return (
    <div className="summary-container">
      <h2>Adventure Concluded</h2>
      <div className="summary-text">
        {summary}
      </div>
      <div className="summary-actions">
        <Button onClick={onRetryPath}>Retry Path</Button>
        <Button onClick={onNewGame}>New Saga</Button>
      </div>
    </div>
  );
}