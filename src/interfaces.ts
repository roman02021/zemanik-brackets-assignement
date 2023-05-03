export interface Character {
    name: string;
    height: number;
    mass: number;
    hair_color: string;
    skin_color: string;
    birth_year: string;
    gender: string;
    homeworld: string;
    films: string[];
    species: string[];
    vehicles: string[];
    starships: string[];
    created: string;
    edited: string;
    url: string;
    image?: string;
}
export interface ApiResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Character[];
}
