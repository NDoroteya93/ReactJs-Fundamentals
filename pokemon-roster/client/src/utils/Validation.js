export const Validation = (fields) => { 
  let formattedFields = {};
  Object.keys(fields).forEach(field => { 
    
      formattedFields[field] = typeof fields[field] === 'boolean' && !fields[field]
        ? true
        : fields[field].length === 0;
    });

  return formattedFields;
}