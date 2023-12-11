"use client";
import React, { useRef, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import {
  Box,
  ClickAwayListener,
  Grow,
  MenuList,
  Paper,
  Popper,
  Typography,
} from "@mui/material";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useSelector } from "@/lib/store";
import { Language, selectLanguages, updateSelectedLanguage } from "@/lib/slices/languages/languagesSlice";
import { useDispatch } from "react-redux";

export const LanguageSelect = () => {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState<boolean>(false);
  const { languages } = useSelector(selectLanguages);
  const dispatch = useDispatch()

  const handleClose = (event: React.MouseEvent<EventTarget>) => {
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleLanguageSelect = (language:Language) => {
    dispatch(updateSelectedLanguage(language))
    setOpen(false);
  };

  return (
    <Box>
      <Box
        ref={anchorRef}
        sx={styles.chevron}
        onClick={handleToggle}
        aria-controls={open ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        id="chevron-down"
      >
        <Icon icon={"heroicons-outline:chevron-down"}/>
      </Box>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "start top" : "start bottom",
              marginTop: 15,
              marginRight: 10,
            }}
          >
            <Paper sx={styles.menuContainer}>
              <ClickAwayListener onClickAway={handleClose as any}>
                <MenuList id="menu-list-grow" sx={{ paddingX: "10px" }}>
                {languages.map(language=>{
                    return (
                    <MenuItem
                        key={language._id}
                        onClick={() => {
                            handleLanguageSelect(language)
                        }}
                        sx={styles.menuItem}
                        disableRipple
                    >
                        <Box sx={styles.menuItemBox}>                        
                        <Typography sx={styles.menuItemFont}>{language.name}</Typography>
                        </Box>
                    </MenuItem>)
                })}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Box>
  );
};

const styles = {
  alertBox: {
    backgroundColor: "black",
    borderRadius: "12px",
    "&:hover": {
      cursor: "pointer",
    },
  },
  imageContainer: {
    borderRadius: "22px",
    backgroundColor: "black",
  },
  chevron: {
    color: "black",
    marginTop:1,
    marginLeft:1,
    "&:hover": {
      cursor: "pointer",
    },
  },
  menuContainer: {
    borderRadius: "12px",
    boxShadow: "0px 10px 20px lightgray",
  },
  menuItem: {
    "&:hover": {
      backgroundColor: "grey",
      borderRadius: "0.75rem",
    },
  },
  menuItemBox: {
    display: "flex",
    alignItems: "center",
    gap: 1,
  },
  menuItemFont: {
    fontSize: 18,
    fontWeight: 500,
  },
  submitButton: {
    bgcolor: "black",
    color: "white",
    borderRadius: "8px",
    "&:hover": { bgcolor: "black", color: "white" },
    width: "10rem",
  },
};
