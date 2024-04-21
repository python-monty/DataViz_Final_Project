export const menu = (
  selection,
  { state, setState, stateField, menuOptions },
) => {
  // Create the menu
  const menu = selection
    .selectAll('select')
    .data([null])
    .join('select')
    .attr('class', 'form-select')
    .on('change', (event) => {
      setState((state) => ({
        ...state,
        [stateField]: event.target.value,
      }));
    });

  // Fill out the options
  menu
    .selectAll('option')
    .data(menuOptions)
    .join('option')
    .attr('value', (option) => option.value)
    .text((option) => option.text)
    .property(
      'selected',
      (option) => option.value === state[stateField],
    );
};
