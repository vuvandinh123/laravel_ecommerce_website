import { useState } from "react";

export  function useCheckboxChange(setData,value,isChecked, name) {
    if (name == "categories") {
        setData((item) => {
          if (isChecked) {
            if (!item.categories.includes(value)) {
              return {
                ...item,
                categories: [...item.categories, value],
              };
            }
          } else {
            return {
              ...item,
              categories: item.categories.filter((item) => item !== value),
            };
          }
          return item;
        });
      }
}