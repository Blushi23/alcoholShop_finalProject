import { FunctionComponent, useEffect, useState } from "react";
import Offcanvas from "react-bootstrap/esm/Offcanvas";
import FilterObject from "../interfaces/FilterObject";
import Product from "../interfaces/Product";
import { currencyFormat } from "../services/CurrencyFormat";

interface FilterProps {
    show: boolean;
    setShow: Function;
    handleClose: Function;
    categoryProducts: Product[];
    setSearchQuery: Function;
    searchQuery: any;
    setSelectedVolumes: Function;
    selectedVolumes: number[];
    setSelectedOrigins: Function;
    setSelectedAlcohol: Function;
    setSelectedPrice: Function;
    volumeOptions: number[];
    originOptions: string[];
    alcoholOptions: string[];
    priceOptions: number[];
    setVolumeOptions: Function;
    setOriginOptions: Function;
    setAlcoholOptions: Function;
    setPriceOptions: Function;


}

const Filter: FunctionComponent<FilterProps> = ({ show, setShow, handleClose, categoryProducts, setSearchQuery, searchQuery, setSelectedAlcohol, setSelectedOrigins, setSelectedPrice, setSelectedVolumes, selectedVolumes, volumeOptions, originOptions, alcoholOptions, priceOptions, setVolumeOptions, setOriginOptions,
    setAlcoholOptions, setPriceOptions }) => {
    // let [volumeOptions, setVolumeOptions] = useState<number[]>([])
    // let [originOptions, setOriginOptions] = useState<string[]>([])
    // let [alcoholOptions, setAlcoholOptions] = useState<string[]>([])
    // let [priceOptions, setPriceOptions] = useState<number[]>([])

    let [productsFiltered, setProductsFiltered] = useState<string>()
    // let [productsFiltered, setProductsFiltered] = useState<Product[]>(categoryProducts)

    // useEffect(() => {
    //     setSearchQuery(productsFiltered);
    // }, [productsFiltered, setSearchQuery])


    // let filterProducts = () => {
    //     let filtered = categoryProducts.filter((product: Product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()))


    //     // let filtered = categoryProducts.filter((product: Product) => {
    //     //     ////////
    //     //     return
    //     //     //////////
    //     // });
    //     setProductsFiltered(filtered)
    // }
    //********************************************************************************************************************* */
    // useEffect(() => {
    //     const uniqueVolumes = Array.from(new Set(categoryProducts.map((product: Product) => product.volume))).filter((volume) => volume !== undefined) as number[];
    //     const uniqueOrigins = Array.from(new Set(categoryProducts.map((product: Product) => product.origin))).filter((origin) => origin) as string[];
    //     const uniqueAlcohol = Array.from(new Set(categoryProducts.map((product: Product) => product.alcoholPercentage))).filter((alcoholPercentage) => alcoholPercentage) as string[];
    //     const uniquePrice = Array.from(new Set(categoryProducts.map((product: Product) => product.price))).filter((price) => price !== undefined) as number[];
    //     setVolumeOptions(uniqueVolumes);
    //     setOriginOptions(uniqueOrigins);
    //     setAlcoholOptions(uniqueAlcohol);
    //     setPriceOptions(uniquePrice);
    // }, [categoryProducts]);



    // let handleChekboxChange = (option: string, type: string) => {
    //     let filtered = categoryProducts.filter((product: Product) => {
    //         if (type === 'volume') return product.volume === Number(option)
    //         else if (type === 'origin') return product.origin === option
    //         else if (type === 'alcohol') return product.alcoholPercentage === option
    //         return false;
    //     })
    //     setProductsFiltered(filtered);
    // }

    let handleRangeChange = (index: number, newValue: number) => {
        setPriceOptions((prevValues: any) => {
            let newValues = [...prevValues];
            newValues[index] = newValue;
            return newValues;
        })
    }


    // <i className="fa-solid fa-caret-up"></i>
    // <i className="fa-solid fa-caret-down"></i>

    // const [checkedState, setCheckedState] = useState<boolean[]>([false])
    let [checkedState, setCheckedState] = useState(new Array(categoryProducts.length).fill(false))
    let handleOnChange = (option: any) => {
        let updatedCheckedState = checkedState.map((product, index) =>
            index === option ? !product : product
        )
        setCheckedState(updatedCheckedState)
    }

    return (

        <>
            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Filter</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {/* <div className="form-check"> */}
                    <div>
                        <button className="btn filter-btn" type="button" data-bs-toggle="collapse" data-bs-target="#volumeCollapse" aria-expanded="false" aria-controls="volumeCollapse"><h5>Volume <i className="fa-solid fa-caret-down"></i></h5>
                        </button>
                        <div className="collapse" id="volumeCollapse">
                            <div className="card card-body">
                                <div className="form-check">
                                    {volumeOptions.map((volumeOption, index) =>
                                    (
                                        <div key={index}>
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                value={volumeOption}
                                                id={`${volumeOption}ml`}
                                                checked={checkedState[index]}
                                                // checked={selectedVolumes[] === volumeOption ? true : false}
                                                onChange={(e) => {
                                                    // setProductsFiltered(e.target.value)
                                                    handleOnChange(index)
                                                    setSelectedVolumes(e.target.value)
                                                    console.log(productsFiltered);
                                                }}
                                            // onChange={() => handleChekboxChange(volumeOption.toString(), 'volume')}
                                            />
                                            <label
                                                className="form-check-label" htmlFor={`${volumeOption}ml`} >
                                                {volumeOption} ml
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button className="btn filter-btn" type="button" data-bs-toggle="collapse" data-bs-target="#originCollapse" aria-expanded="false" aria-controls="originCollapse"><h5>Origin <i className="fa-solid fa-caret-down"></i></h5>
                        </button>
                        <div className="collapse" id="originCollapse">
                            <div className="card card-body">
                                <div className="form-check">
                                    {originOptions.map((originOption, index) =>
                                    (
                                        <div key={index}>
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                value={originOption}
                                                id={`${originOption}ml`}
                                                onChange={(e) => {
                                                    setProductsFiltered(e.target.value);
                                                    console.log(productsFiltered);
                                                }}                                                // onChange={() => handleChekboxChange(originOption, 'origin')}
                                            />
                                            <label
                                                className="form-check-label" htmlFor={`${originOption}`} >
                                                {originOption}
                                            </label>

                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button className="btn filter-btn" type="button" data-bs-toggle="collapse" data-bs-target="#alcoholCollapse" aria-expanded="false" aria-controls="alcoholCollapse"><h5>Alcohol Percentage <i className="fa-solid fa-caret-down"></i></h5>
                        </button>
                        <div className="collapse" id="alcoholCollapse">
                            <div className="card card-body">
                                <div className="form-check">
                                    {alcoholOptions.map((alcoholOption, index) =>
                                    (
                                        <div key={index}>
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                value={alcoholOption}
                                                id={`${alcoholOption}%`}
                                                onChange={(e) => setProductsFiltered(e.target.value)}
                                            // onChange={() => handleChekboxChange(alcoholOption, 'alcohol')}
                                            />
                                            <label
                                                className="form-check-label" htmlFor={`${alcoholOption}%`} >
                                                {alcoholOption} %
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button className="btn filter-btn" type="button" data-bs-toggle="collapse" data-bs-target="#priceCollapse" aria-expanded="false" aria-controls="priceCollapse">
                            <h5>Price <i className="fa-solid fa-caret-down"></i></h5>
                        </button>
                        <div className="collapse" id="priceCollapse">
                            <div className="card card-body">
                                <div className="form-check">
                                    <label
                                        htmlFor="priceRange"
                                        className="form-label">Show products up to:</label>
                                    <div>
                                        <input type="range" className="form-range"
                                            min={Math.min(...priceOptions)}
                                            max={Math.max(...priceOptions)}
                                            id="priceRange"
                                            value={priceOptions[0]} onChange={(e) => handleRangeChange(0, Number(e.target.value))} />
                                    </div>
                                    <div className="rangeLabels">
                                        <span id="minPrice">{currencyFormat(Math.min(...priceOptions))}</span>
                                        <span id="rangeValue"><b>{currencyFormat(priceOptions[0])}</b></span>
                                        <span id="maxPrice">{currencyFormat(Math.max(...priceOptions))}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className="btn" onClick={() => {
                        handleClose(true)
                    }}>Apply filters</button>
                </Offcanvas.Body>
            </Offcanvas >    </>
    )
}

export default Filter;
