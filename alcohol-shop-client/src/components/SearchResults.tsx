import { FunctionComponent } from "react";
import Product from "../interfaces/Product";

interface SearchResultsProps {
    products: Product[];
}

const SearchResults: FunctionComponent<SearchResultsProps> = ({ products }) => {
    return (
        <>
            This is SearchResults
        </>
    )
}

export default SearchResults;