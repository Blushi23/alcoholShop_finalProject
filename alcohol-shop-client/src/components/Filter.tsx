// Filter.tsx
import React, { useContext } from "react";
import { Offcanvas } from "react-bootstrap";
import { currencyFormat } from "../services/CurrencyFormat";
import { siteTheme } from "../App";

interface FilterProps {
    show: boolean;
    setShow: Function;
    setSearchQuery: Function;
    setSelectedVolumes: React.Dispatch<React.SetStateAction<number[]>>;
    selectedVolumes: number[];
    setSelectedOrigins: React.Dispatch<React.SetStateAction<string[]>>;
    selectedOrigins: string[];
    setSelectedAlcohol: React.Dispatch<React.SetStateAction<string[]>>;
    selectedAlcohol: string[];
    setSelectedPrice: React.Dispatch<React.SetStateAction<number[]>>;
    selectedPrice: number[];
    volumeOptions: number[];
    originOptions: string[];
    alcoholOptions: string[];
    priceOptions: number[];
    handleClose: Function;
    setPriceOptions: Function;
    handleRangeChange: Function;
}

const Filter: React.FC<FilterProps> = ({
    show,
    setShow,
    setSearchQuery,
    setSelectedVolumes,
    selectedVolumes,
    setSelectedOrigins,
    selectedOrigins,
    setSelectedAlcohol,
    selectedAlcohol,
    setSelectedPrice,
    selectedPrice,
    volumeOptions,
    originOptions,
    alcoholOptions,
    priceOptions,
    handleClose,
    setPriceOptions,
    handleRangeChange
}) => {
    let theme = useContext(siteTheme)
    const handleFilterApply = () => {
        // Perform actions when the filter is applied
        setShow(false);
    };

    const handleFilterReset = () => {
        // Reset all filter options
        setSearchQuery("");
        setSelectedVolumes([]);
        setSelectedOrigins([]);
        setSelectedAlcohol([]);
        setSelectedPrice([]);
    };

    // let handleRangeChange = (index: number, newValue: number) => {
    //     setPriceOptions((prevValues: any) => {
    //         let newValues = [...prevValues];
    //         newValues[index] = newValue;
    //         return newValues;
    //     })
    // }

    return (
        <Offcanvas show={show} onHide={handleClose}>
            <Offcanvas.Header className={`${theme}`} closeButton data-bs-theme={`${theme}`}>
                <Offcanvas.Title>Filter </Offcanvas.Title>

            </Offcanvas.Header>
            <Offcanvas.Body className={`${theme}`}>
                <hr />
                <div className={`filter-modal ${show ? "show" : ""}`}>
                    <div className="filter-content">
                        <div className="filter-header">

                        </div>
                        <div className="filter-body">
                            <button className="btn filter-btn" type="button" data-bs-toggle="collapse" data-bs-target="#volumeCollapse" aria-expanded="false" aria-controls="volumeCollapse"><h5>Volume <i className="fa-solid fa-caret-down"></i></h5>
                            </button>
                            <div className="collapse" id="volumeCollapse">
                                <div className="card card-body">
                                    <div className="form-check">
                                        {volumeOptions.map((option) => (
                                            <div key={option}>
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id={`volume-${option}`}
                                                    checked={selectedVolumes.includes(option)}
                                                    onChange={() =>
                                                        setSelectedVolumes((prev) =>
                                                            prev.includes(option)
                                                                ? prev.filter((v) => v !== option)
                                                                : [...prev, option]
                                                        )
                                                    }
                                                />
                                                <label htmlFor={`volume-${option}`}>{option} ml</label>
                                            </div>
                                        ))}

                                    </div>
                                </div>
                            </div>
                            <div>

                                <button className="btn filter-btn" type="button" data-bs-toggle="collapse" data-bs-target="#originCollapse" aria-expanded="false" aria-controls="originCollapse"><h5>Origin <i className="fa-solid fa-caret-down"></i></h5>
                                </button>
                                <div className="collapse" id="originCollapse">
                                    <div className="card card-body">
                                        <div className="form-check">
                                            {originOptions.map((option) => (
                                                <div key={option}>
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id={`origin-${option}`}
                                                        checked={selectedOrigins.includes(option)}
                                                        onChange={() =>
                                                            setSelectedOrigins((prev) =>
                                                                prev.includes(option)
                                                                    ? prev.filter((v) => v !== option)
                                                                    : [...prev, option]
                                                            )
                                                        }
                                                    />
                                                    <label htmlFor={`origin-${option}`}>{option}</label>
                                                </div>
                                            ))}

                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>

                                <button className="btn filter-btn" type="button" data-bs-toggle="collapse" data-bs-target="#alcoholCollapse" aria-expanded="false" aria-controls="alcoholCollapse"><h5>Alcohol <i className="fa-solid fa-caret-down"></i></h5>
                                </button>
                                <div className="collapse" id="alcoholCollapse">
                                    <div className="card card-body">
                                        <div className="form-check">
                                            {alcoholOptions.map((option) => (
                                                <div key={option}>
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id={`alcohol-${option}`}
                                                        checked={selectedAlcohol.includes(option)}
                                                        onChange={() =>
                                                            setSelectedAlcohol((prev) =>
                                                                prev.includes(option)
                                                                    ? prev.filter((v) => v !== option)
                                                                    : [...prev, option]
                                                            )
                                                        }
                                                    />
                                                    <label htmlFor={`alcohol-${option}`}>{option} %</label>
                                                </div>
                                            ))}

                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*  
                            <div>
                         
                                <button className="btn filter-btn" type="button" data-bs-toggle="collapse" data-bs-target="#priceCollapse" aria-expanded="false" aria-controls="priceCollapse"><h5>Price <i className="fa-solid fa-caret-down"></i></h5>
                                </button>
                                <div className="collapse" id="priceCollapse">
                                    <div className="card card-body">
                                        <div className="form-check">
                                            {priceOptions.map((option) => (
                                                <div key={option}>
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id={`price-${option}`}
                                                        checked={selectedPrice.includes(option)}
                                                        onChange={() =>
                                                            setSelectedPrice((prev) =>
                                                                prev.includes(option)
                                                                    ? prev.filter((v) => v !== option)
                                                                    : [...prev, option]
                                                            )
                                                        }
                                                    />
                                                    <label htmlFor={`price-${option}`}>{option} nis</label>
                                                </div>
                                            ))}

                                        </div>
                                    </div>
                                </div>
                            </div>
                             */}
                            {/* *********price range********** */}
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
                                                    min={Math.min(...selectedPrice)}
                                                    max={Math.max(...selectedPrice)}
                                                    id="priceRange"
                                                    value={selectedPrice[0]} onChange={(e) => handleRangeChange(0, Number(e.target.value))} />
                                            </div>
                                            <div className="rangeLabels">
                                                <span id="minPrice">{currencyFormat(Math.min(...selectedPrice))}</span>
                                                <span id="rangeValue"><b>{currencyFormat(selectedPrice[0])}</b></span>
                                                <span id="maxPrice">{currencyFormat(Math.max(...selectedPrice))}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                            </div>
                        </div>
                        <div className="filter-footer mt-2">
                            <button className="btn reset-btn" onClick={handleFilterReset}>Reset</button>
                            <button className="btn apply-btn ms-2 " onClick={handleFilterApply}>Apply</button>
                        </div>
                    </div>
                </div>
            </Offcanvas.Body>
        </Offcanvas >
    );
};

export default Filter;
