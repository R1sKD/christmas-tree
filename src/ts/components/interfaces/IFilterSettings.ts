type IFilterSettings = {
  range: {
    count: {
      min: number,
      max: number
    },
    year: {
      min: number,
      max: number
    }
  },
  filter: {
    shapes: string[],
    colors: string[],
    sizes: string[],
    isFavorite: boolean | null
  },
  sort: string;
  search: string;
}

export default IFilterSettings;