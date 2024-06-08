import React, { useState } from 'react';
import './ColorDropdown.css';
import { motion, AnimatePresence } from 'framer-motion';

const Nav = ({ onColorSelect }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const colors = ['yellow', 'pink', 'wheat', 'red', 'lightblue'];
    const colorNames = ['Yellow', 'Pink', 'wheat', 'Red', 'Lighblue'];

    const handleButtonClick = () => {
        setShowDropdown(!showDropdown);
    };

    const handleColorSelect = (color) => {
        setShowDropdown(false);
        onColorSelect(color);
    };

    return (
        <div className="sideNav">
            <h2>Notekeeper</h2>
            <div className="dropdown-container">
                <button onClick={handleButtonClick}>+</button>
                <AnimatePresence>
                    {showDropdown && (
                        <motion.ul
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="dropdown-menu"
                        >
                            {colors.map((color, index) => (
                                <div
                                    className="color-item tooltip"
                                    key={color}
                                    onClick={() => handleColorSelect(color)}
                                >
                                    <span
                                        className="color-circle"
                                        style={{ backgroundColor: color }}
                                    ></span>
                                    <span className="tooltip-text">{colorNames[index]}</span>
                                </div>
                            ))}
                        </motion.ul>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Nav;
