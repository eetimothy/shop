import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
    DialogContent,
    Grid,
    Typography,
    Box,
    Fade,
    CircularProgress,
    Badge,
    Avatar,
    Fab,
    Button,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListItemSecondaryAction,
    Hidden,
    TextField,
    Tooltip,
    IconButton,
    Divider,
  } from "@material-ui/core";
  
  import {
    Close as CloseIcon,
    Photo as PhotoIcon,
    CloudUpload as CloudUploadIcon,
    Person as PersonIcon,
    Edit as EditIcon,
    PersonOutline as PersonOutlineIcon,
    Email as EmailIcon,
    Warning as WarningIcon,
    Check as CheckIcon,
    AccessTime as AccessTimeIcon,
    DeleteForever as DeleteForeverIcon,
  } from "@material-ui/icons";

  const styles = (theme) => ({
    dialogContent: {
      paddingTop: theme.spacing(2),
    },
  
    avatar: {
      marginRight: "auto",
      marginLeft: "auto",
  
      width: theme.spacing(14),
      height: theme.spacing(14),
    },
  
    nameInitials: {
      cursor: "default",
    },
  
    personIcon: {
      fontSize: theme.spacing(7),
    },
  
    small: {
      width: theme.spacing(4),
      height: theme.spacing(4),
  
      minHeight: "initial",
    },
  });