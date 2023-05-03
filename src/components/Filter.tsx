import React, { Dispatch, SetStateAction } from 'react';
interface Props {
    onChange: Dispatch<SetStateAction<string>>;
}
function Filter({ onChange }: Props) {
    return (
        <div className="flex justify-center mb-4 w-full">
            <div className="flex w-full flex-col">
                <label htmlFor="genderFilter">Show gender</label>
                <select
                    className=" space-x-3 sm:w-72 w-full px-4 h-12  mx-auto bg-blue-500 bg-opacity-20 rounded-md hover:cursor-pointer hover:bg-opacity-30 focus:bg-opacity-75"
                    id="genderFilter"
                    onChange={(e) => onChange(e.currentTarget.value)}
                >
                    <option value="both">Both</option>
                    <option value="male">Men</option>
                    <option value="female">Women</option>
                </select>
            </div>
        </div>
    );
}

export default Filter;
