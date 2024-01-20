import "./Filters.scss";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

interface Props {
  filters: {
    name: string;
    value: string;
  }[];
}

const Filters = ({ filters }: Props) => {
  const [optionsContainerActive, setOptionsContainerActive] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const paramFilter = searchParams.get("category");

  const toggleOptionsContainer = () => {
    setOptionsContainerActive(!optionsContainerActive);
  };

  const selectCategory = (value: string) => {
    if (paramFilter === value) {
      searchParams.delete("category");

      setSearchParams(searchParams);
      return;
    }
    setSearchParams({ category: value });
  };

  const getNameOfCategory = (value: string | null) => {
    if (!value) return "Select Category";

    return filters.find((filter) => filter.value === value)?.name;
  };
  return (
    <div className="container">
      <h2>Category</h2>

      <div className="select-box">
        <div
          className={`selected ${optionsContainerActive && "rotate"}`}
          onClick={toggleOptionsContainer}
        >
          {getNameOfCategory(paramFilter)}
        </div>
        <div
          className={`options-container ${optionsContainerActive && "active"}`}
        >
          {filters.map((filter) => (
            <div
              className={`option ${paramFilter === filter.value && "active"}`}
              key={filter.value}
            >
              <input
                type="radio"
                className="radio"
                id={filter.value}
                name="category"
                onClick={(e) => {
                  // @ts-expect-error
                  selectCategory(e.target.id);
                  toggleOptionsContainer();
                }}
              />
              <label htmlFor={filter.value}>{filter.name}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filters;
