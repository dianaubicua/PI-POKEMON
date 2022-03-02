import reducer from "../src/reducer"; 
import {} from '../actions/index'

describe("reducer", () => {
  it("Debería retornar el estado inicial", () => {
    expect(reducer(undefined, [])).toEqual(
        { "countries": [], 
        "allCountries": [], 
        "continents": [], 
        "detail": [], 
        "activities": [], 
        "filter": {"continent": "all", "activity": "all", "nombre": "all", population: "all"} });
  }) })