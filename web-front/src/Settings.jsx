import { useState } from "react";
import DropZone from "./DropZone";

const Settings = ({ clusters, formik }) => {

    const [value, setValue] = useState(50)

    return (
        <div className="p-4 relative h-full">
            <form className="flex flex-col gap-12 h-full justify-between" onSubmit={formik.handleSubmit}>
                <div className="p-4">
                    <div>
                        <div className="flex">
                            <label htmlFor="default-range" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-[0.3rem]">Anti Aliasing: </label>
                            <input htmlFor="defailt-range" className="bg-transparent ml-2 text-white outline-none" value={formik.values.aliasing} onChange={formik.handleChange} name="aliasing" type="number" min="0" max="200"/>
                        </div>
                        <input name="aliasing" id="default-range" min="0" max="200" type="range" value={formik.values.aliasing} onChange={formik.handleChange} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
                    </div>
                    <DropZone name="file" onChange={formik.setFieldValue} />
                </div>
                <button type="submit" className=" w-full bg-cyan-300 rounded-xl py-2 hover:scale-105 font-extrabold transition duration-200">Generate</button>
            </form>
        </div>
    )

}

export default Settings;