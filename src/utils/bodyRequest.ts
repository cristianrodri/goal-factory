export const removeUnwantedProperties = (obj: Record<string, never>) => {
  // Properties to remove
  const propertiesToRemove = ['user', '_id', '__v', 'createdAt', 'updatedAt']

  // Check if the input is an object
  if (typeof obj === 'object' && obj !== null) {
    // Iterate over the properties of the object
    for (const key in obj) {
      // If the key is in the list of properties to remove, delete it
      if (propertiesToRemove.includes(key)) {
        delete obj[key]
      } else {
        // Recursively call the function for nested objects
        removeUnwantedProperties(obj[key])
      }
    }
  }
}
