import React from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';
import TuneIcon from '@material-ui/icons/Tune';
import { useDispatch, useSelector } from 'react-redux';
import { useStyles } from './useStyles';
import {
  categoryFilterSelector,
  getAllCategoriesSelector,
  priorityFilterSelector,
  stateFilterSelector,
} from '../../redux/selectors';

export default function FilterMenu() {
  const styles = useStyles();
  const dispatch = useDispatch();
  const allCategories = useSelector(getAllCategoriesSelector);
  const categoryFilter = useSelector(categoryFilterSelector);
  const stateFilter = useSelector(stateFilterSelector);
  const priorityFilter = useSelector(priorityFilterSelector);

  const handleChangeCategoryFilter = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>,
  ) => {};

  return (
    <Box display='flex' alignItems='center' className={styles.container}>
      <TuneIcon />

      {/* Category filter */}
      <FormControl className={styles.categoryFormControl}>
        <InputLabel id='category-filter-label'>Category</InputLabel>
        <Select
          labelId='category-filter-label'
          id='category-filter'
          value={categoryFilter}
          onChange={handleChangeCategoryFilter}
        >
          <MenuItem value={''}>All</MenuItem>
          {allCategories?.length > 0 &&
            allCategories.map((item) => {
              return (
                <MenuItem value={item.title} id={item.id}>
                  {item.title}
                </MenuItem>
              );
            })}
        </Select>
      </FormControl>
    </Box>
  );
}
