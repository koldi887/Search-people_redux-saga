export type PeopleDetailsType = {
    birth_year: string,
    eye_color: string
    films: string[],
    gender: string,
    hair_color: string,
    homeworld: string,
    mass: string,
    name: string,
    skin_color: string,
    url: string,
    height: string
    vehicles: []
}

export type PeopleListResponseType = {
    count: number,
    next: string,
    previous: string,
    results: PeopleDetailsType[],
}