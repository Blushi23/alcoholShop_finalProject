import { Volume, Origin, Alcohol } from "../Types/FilterTypes";
export default interface FilterObject {
    subcategory: string[];
    volume: Volume[];
    alcoholPercentage: Alcohol[];
    origin: Origin[];
    price: number[];
}

//לבדוק אם אלו הערכים שצריכים להיות או PRODUCT[]