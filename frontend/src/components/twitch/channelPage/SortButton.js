import { ic_sort } from "react-icons-kit/md/ic_sort";
import Icon from "react-icons-kit";
import React, { useState } from "react";

import { SortButton, SortDropDownList } from "./StyledComponents";

export default ({ sortBy, setSortBy, setData }) => {
  const [open, setOpen] = useState(false);
  const SortOptions = ["Time", "Trending", "Views"];
  return (
    <>
      <SortButton
        onClick={() => {
          setOpen(!open);
        }}>
        <Icon icon={ic_sort} size={20} />
        Sort by: {sortBy}
      </SortButton>
      {open ? (
        <SortDropDownList>
          {SortOptions.map(option => {
            return (
              <li
                key={option}
                onClick={() => {
                  setData();
                  setSortBy(option);
                  setOpen(false);
                }}>
                {option}
              </li>
            );
          })}
        </SortDropDownList>
      ) : null}
    </>
  );
};
