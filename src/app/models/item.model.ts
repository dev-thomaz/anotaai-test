

export interface Item {
    id: number;
    title: string;
    description: string;
    img: string;
    type: number;
  }

  export const typeMap: { [key: number]: string } = {
    1: 'Paisagem',
    2: 'Flor',
    3: 'Pizza',
  };