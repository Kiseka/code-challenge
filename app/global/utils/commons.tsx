import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import moment from "moment";

export const validatePassword = (password: string) => {
    let minNumberofChars = 8;
    if (password.length < minNumberofChars) {
        return false;
    }
    if (!password.match(/[a-z]/g) || !password.match(/[A-Z]/g) || !password.match(/[0-9]/g)
        || !password.match(/[!@#$%^&*]/g)) {
        return false;
    }
    return true;
}

export const formatNumberWithLetters = (num: number): string => {
    const absNum = Math.abs(num);

    if (absNum >= 1e6) {
        const formattedNum = (num / 1e6).toFixed(num % 1e6 === 0 ? 0 : 2);
        return formattedNum.endsWith('.00') ? formattedNum.slice(0, -3) + 'M' : formattedNum + 'M';
    } else if (absNum >= 1e3) {
        const formattedNum = (num / 1e3).toFixed(num % 1e3 === 0 ? 0 : 2);
        return formattedNum.endsWith('.00') ? formattedNum.slice(0, -3) + 'K' : formattedNum + 'K';
    } else {
        return num.toString();
    }
}

export const formatDate = (value: string, format: string) => {
    if (value) {
        return moment(value.toString()).format(format);
    }
    return ""
}

export const isLinkActive = (routes: string[]) => {
    for (const route of routes) {
        if (window.location.href.includes(route)) {
            return "active";
        }
    }
    return "";
}



export const isValueEmpty = (value: string | undefined | null) => {
    if (value !== null && value !== undefined && value !== "") {
        return false
    } else {
        return true
    }
}


export const notEmpty = (value: string | undefined | null) => {
    if (value !== null && value !== undefined && value !== "") {
        return true
    } else {
        return false
    }
}

export const chunkArray = (array: any, chunkSize: number) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
        const chunk = array.slice(i, i + chunkSize);
        chunks.push(chunk);
    }
    return chunks;
}

export const addLeadingZero = (number: number): string => {
    if (number >= 1 && number <= 9) {
        return `0${number}`;
    }
    return number.toLocaleString();
}

export const makePossessive = (name: string): string => {
    const parts = name.trim().split(' ');

    if (parts.length === 1) {
        return `${name}'s`;
    }

    const lastName = parts.pop();
    const firstName = parts.join(' ');

    return `${firstName} ${lastName}'s`;
}

export const cleanAmount = (amount: string) => {
    return parseFloat(amount.replace(/,/g, ''))
}


export const convertSnakeCaseToTitle = (input: string): string => {
    // Split the string by underscores and capitalize the first letter of each word
    const words = input.split('_');
    const titleWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());

    // Join the capitalized words with spaces
    const titleString = titleWords.join(' ');

    return titleString;
}


export const getFirstAndLastName = (fullName: string) => {
    const parts = fullName.split(' ');
    if (parts.length < 2) {
        return [fullName, ""]
    } else {
        const firstName = parts[0];
        const lastName = parts.slice(1).join(' ');
        return [firstName, lastName];
    }
}

export const genUUID = () => {
    let lut = []; for (let i = 0; i < 256; i++) { lut[i] = (i < 16 ? '0' : '') + (i).toString(16); }
    let d0 = Math.random() * 0xffffffff | 0;
    let d1 = Math.random() * 0xffffffff | 0;
    let d2 = Math.random() * 0xffffffff | 0;
    let d3 = Math.random() * 0xffffffff | 0;
    return lut[d0 & 0xff] + lut[d0 >> 8 & 0xff] + lut[d0 >> 16 & 0xff] + lut[d0 >> 24 & 0xff] + '-' +
        lut[d1 & 0xff] + lut[d1 >> 8 & 0xff] + '-' + lut[d1 >> 16 & 0x0f | 0x40] + lut[d1 >> 24 & 0xff] + '-' +
        lut[d2 & 0x3f | 0x80] + lut[d2 >> 8 & 0xff] + '-' + lut[d2 >> 16 & 0xff] + lut[d2 >> 24 & 0xff] +
        lut[d3 & 0xff] + lut[d3 >> 8 & 0xff] + lut[d3 >> 16 & 0xff] + lut[d3 >> 24 & 0xff];
}