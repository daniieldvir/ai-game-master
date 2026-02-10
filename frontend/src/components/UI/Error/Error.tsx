import './Error.scss';

type Props = {
    error: string;
}

export default function Error({ error }: Props) {
    return (
        <div className="error-box">
            {error}
          </div>
    );
}