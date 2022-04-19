export function toTitle(text: string) {
    return text.toLowerCase().split(' ').map(t => t[0].toUpperCase() + t.slice(1)).join(" ");
}
