import './Progressbar.scss';

type Props = {
    hp: number;
}

export default function Progressbar({ hp }: Props) {
    const getHpColor = (currentHp: number) => {
        if (currentHp > 50) return '#10b981'; // Emerald
        if (currentHp > 20) return '#fbbf24'; // Amber
        return '#ef4444'; // Red
    };

    return (
        <div className="hp-bar-bg">
                <div
            className="hp-bar-fill"
            role="progressbar"
            aria-valuenow={hp}
            aria-valuemin={0}
            aria-valuemax={100}
            style={{
                width: `${hp}%`,
                backgroundColor: getHpColor(hp)
            }}
        />        
        </div>
      
    );
}