import { FunctionComponent, useEffect, useState } from "react";
import Product from "../interfaces/Product";
import Offcanvas from "react-bootstrap/esm/Offcanvas";
import CategoryProducts from "./CategoryProducts";

interface FilterProps {
    categoryProducts: Product[];
    setSearchQuery: Function;
    show: boolean;
    setShow: Function;
    handleClose: Function
    setSelectedVolumes: Function;
    setSelectedOrigins: Function;
    setSelectedAlcohol: Function;
    setSelectedPrice: Function;
    selectedVolumes: any;
    selectedOrigins: any;
    selectedAlcohol: any;
    selectedPrice: any;

}

const Filter: FunctionComponent<FilterProps> = ({ categoryProducts, show, handleClose, selectedVolumes, setSelectedVolumes, setSelectedOrigins, setSelectedAlcohol, setSelectedPrice, selectedOrigins, selectedAlcohol, selectedPrice }) => {
    // let [show, setShow] = useState<boolean>(false)
    // let handleClose = () => setShow(false);
    // let handleShow = () => setShow(true);

    let [volumeOptions, setVolumeOptions] = useState<number[]>([])
    let [originOptions, setOriginOptions] = useState<string[]>([])
    let [alcoholOptions, setAlcoholOptions] = useState<string[]>([])
    let [priceOptions, setPriceOptions] = useState<number[]>([])

    useEffect(() => {
        const uniqueVolumes = Array.from(
            new Set(categoryProducts.map((product: Product) => product.volume))
        ).filter((volume) => volume !== undefined) as number[];
        setVolumeOptions(uniqueVolumes);
    }, [categoryProducts]);

    useEffect(() => {
        const uniqueOrigins = Array.from(
            new Set(categoryProducts.map((product: Product) => product.origin))
        ).filter((origin) => origin!) as string[];
        setOriginOptions(uniqueOrigins);
    }, [categoryProducts]);

    useEffect(() => {
        const uniqueAlcohol = Array.from(
            new Set(categoryProducts.map((product: Product) => product.alcoholPercentage))
        ).filter((alcoholPercentage) => alcoholPercentage!) as string[];
        setAlcoholOptions(uniqueAlcohol);
    }, [categoryProducts]);

    useEffect(() => {
        const uniquePrice = Array.from(
            new Set(categoryProducts.map((product: Product) => product.price))
        ).filter((price) => price !== undefined) as number[];
        setPriceOptions(uniquePrice);
    }, [categoryProducts]);


    const handleVolumeChange = (selectedVolume: number) => {
        setSelectedVolumes((prevVolumes: number[]) => prevVolumes.includes(selectedVolume) ? prevVolumes.filter((volume) => volume !== selectedVolume) : [...prevVolumes, selectedVolume])

        // if (selectedVolumes?.includes(selectedVolume)) {
        // setSelectedVolumes(selectedVolumes.filter((volume) => volume !== selectedVolume));
        // } else {
        // setSelectedVolumes([...selectedVolumes, selectedVolume]);
        // }
    };

    const handleOriginChange = (selectedOrigin: string) => {
        setSelectedOrigins((prevOrigins: string[]) => prevOrigins.includes(selectedOrigin) ? prevOrigins.filter((origin) => origin !== selectedOrigin) : [...prevOrigins, selectedOrigin]);
    };
    const handleAlcoholChange = (selectedAlcohol: string) => {
        setSelectedAlcohol((prevAlcohol: string[]) => prevAlcohol.includes(selectedAlcohol) ? prevAlcohol.filter((Alcohol) => Alcohol !== selectedAlcohol) : [...prevAlcohol, selectedAlcohol]);
    };
    const handlePriceChange = (selectedPrice: number) => {
        setSelectedPrice((prevPrice: number[]) => prevPrice.includes(selectedPrice) ? prevPrice.filter((Price) => Price !== selectedPrice) : [...prevPrice, selectedPrice]);
    };



    return (
        <>
            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Filter</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div className="form-check">
                        <h5>Volume</h5>
                        {volumeOptions.map((volumeOption, index) => (
                            <div key={index}>
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value={volumeOption}
                                    id={`${volumeOption}ml`}
                                    onChange={() => handleVolumeChange(volumeOption)} />
                                <label
                                    className="form-check-label" htmlFor={`${volumeOption}ml`} >
                                    {volumeOption} ml
                                </label>

                            </div>
                        ))}
                    </div>
                    <div className="form-check mt-4">
                        <h5>Origin Country</h5>
                        {originOptions.map((originOption, index) => (
                            <div key={index}>
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value={originOption}
                                    id={`${originOption}ml`}

                                    onChange={() => handleOriginChange(originOption)}
                                />

                                <label
                                    className="form-check-label" htmlFor={`${originOption}ml`} >
                                    {originOption}
                                </label>

                            </div>
                        ))}
                    </div>
                    <div className="form-check mt-4">
                        <h5>Alcohol Percentage</h5>
                        {alcoholOptions.map((alcoholOption, index) => (
                            <div key={index}>
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value={alcoholOption}
                                    id={`${alcoholOption}%`}

                                    onChange={() => handleAlcoholChange(alcoholOption)}
                                />

                                <label
                                    className="form-check-label" htmlFor={`${alcoholOption}%`} >
                                    {alcoholOption}%
                                </label>

                            </div>
                        ))}
                    </div>
                    <div className="form-check mt-4">
                        <h5>Price</h5>
                        {priceOptions.map((priceOption, index) => (
                            <div key={index}>
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value={priceOption}
                                    id={`${priceOption}&#8362;`}

                                    onChange={() => handlePriceChange(priceOption)}
                                />

                                <label
                                    className="form-check-label" htmlFor={`${priceOption}&#8362;`} >
                                    {priceOption} &#8362;
                                </label>

                            </div>
                        ))}
                    </div>
                </Offcanvas.Body>
            </Offcanvas>





            {/* <CategoryProducts setShow={setShow} /> */}
        </>
    )
}

export default Filter;