import React from "react";
import Input from "../Input";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function Search() {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();

    const search = (data) => {
        const query = data?.query?.trim();

        if (!query) return;

        navigate(`/search/${query}`);
    };

    return (
        <form onSubmit={handleSubmit(search)} className="flex items-center">
            <Input
                placeholder="Search"
                {...register("query", { required: true })}
            />
            <button type="submit" className="hidden">Search</button>
        </form>
    );
}

export default Search;