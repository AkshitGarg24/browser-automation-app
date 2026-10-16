import {
  uniqueNamesGenerator,
  adjectives,
  animals,
  type Config,
} from "unique-names-generator"

export function generateSlug(customConfig?: Partial<Config>): string {
  return uniqueNamesGenerator({
    dictionaries: [adjectives, animals],
    separator: "-",
    style: "lowerCase",
    length: 2,
    ...customConfig,
  })
}
