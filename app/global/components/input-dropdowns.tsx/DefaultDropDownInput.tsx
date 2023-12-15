"use client";

import { useEffect, useRef, useState } from "react";

export type TypSelectableItem = {
    title: string,
    value: any
}
type TypeProps = {
    items: TypSelectableItem[]
    onSelect: (value: any | null) => void,
}

const DefaultDropDownInput = ({ items, onSelect }: TypeProps) => {
    const [showDropDown, setShowDropDown] = useState(false)
    const [selectedText, setSelectedText] = useState("")
    const [selectedValue, setSelectedValue] = useState<any>(null)
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [data, setData] = useState<TypSelectableItem[]>([])

    useEffect(() => {
        const handleOutsideClick = (event: any) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropDown(false);

            }
        };
        document.addEventListener("click", handleOutsideClick);

        // Cleanup the event listener when the component unmounts
        return () => {
            document.removeEventListener("click", handleOutsideClick);
        };
    }, [])

    useEffect(() => {
        setData(items)
        setSelectedText("")
        setSelectedValue(null)
        onSelect(null);
    }, [items])

    const searchItems = (value: string) => {
        onSelect(null);
        setSelectedText(value)
        setSelectedValue(null)

        if (value === "") {
            setData(items); // If the search value is empty, show all items
        } else {
            const filteredItems = items.filter(item =>
                item.title.toLowerCase().includes(value.toLowerCase())
            );
            setData(filteredItems);
        }
    }

    const valueSelected = (item: TypSelectableItem) => {
        onSelect(item.value);
        setSelectedText(item.title);
        setSelectedValue(item.value)
        setShowDropDown(!showDropDown)
    }


    return (
        <>
            <div ref={dropdownRef}>
                <input value={selectedText} onChange={(e) => searchItems(e.target.value)}
                    onFocus={() => setShowDropDown(true)} type="text"
                    placeholder="Search..." className={`form-input ${!selectedValue && selectedText != "" && 'border-red-600'}`} />
                <div className={!showDropDown ? 'hidden' : '' + 'z-10 absolute w-full text-base list-none min-h-[100px] bg-white shadow-2xl py-b mt-1 max-h-[300px]  border rounded overflow-y-auto'} >
                    <ul className="">

                        {
                            data.map((item, key) =>
                                <li key={key} onClick={() => valueSelected(item)} className="nav-dropdown-item text-sm"> <span>{item.title}</span> </li>
                            )
                        }
                        {
                            data.length == 0 &&
                            <li className="nav-dropdown-item text-sm flex justify-center">No Record Yet!</li>
                        }

                    </ul>

                </div>
            </div>
        </>
    )
}

export default DefaultDropDownInput