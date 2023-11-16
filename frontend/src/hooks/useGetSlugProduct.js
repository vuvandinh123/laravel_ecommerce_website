import { useState } from "react";

import { AppURL } from "../api/AppURL";
import useApiCall from "./useApiCall";
import { getRequestSite } from "../api/requestSite";
import { PRODUCTS } from "../constants/constants";

export default function useGetSlugProduct(slug) {
    const [data, setData] = useState({});
    const [src, setSrc] = useState("");
    useApiCall(async () => {
        const respones = await getRequestSite(PRODUCTS + "/" + slug);
        setData(respones)
        setSrc(AppURL.ImageUrl + respones.images[0].image_url);
        return null;
    }, [], [])
    return { data, src, setSrc };
}