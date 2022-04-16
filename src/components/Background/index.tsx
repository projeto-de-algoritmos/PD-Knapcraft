import style from './style.module.css';

export default function Background({ backgroundUri }: BackgroundProps) {
    return <div className={style.background} style={{backgroundImage: `url(${backgroundUri})`}}/>
}

type BackgroundProps = {
    backgroundUri?: string;
};
