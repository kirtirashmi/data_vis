const fs = require('fs');

// Read the JSON data from the first file
const file1Data = JSON.parse(fs.readFileSync('output_cfg.json', 'utf8'));

// Read the JSON data from the second file
const file2Data = JSON.parse(fs.readFileSync('output_acc.json', 'utf8'));

// Create an empty array to store mismatched records
const mismatchedRecords = [];

// Function to compare two records and highlight differences
function compareRecords(record1, record2) {
  const differences = {};
  let match = true;

  for (const key in record1) {
    if (
      record1.hasOwnProperty(key) &&
      record2.hasOwnProperty(key) &&
      !(
        key.startsWith('@') ||
        key === 'luname' ||
        key === 'keyref' ||
        key.startsWith('Obj')
      )
    ) {
      if (record1[key] !== record2[key]) {
        differences[key] = {
          CfgEnvironment: record1[key],
          AccEnvironment: record2[key],
        };
        match = false;
      }
    }
  }

  if (!match) {
    // Differences found, add the record to mismatchedRecords
    mismatchedRecords.push({
      Identity: record1.Identity,
      differences,
    });
  }
}

// Compare records in file1Data with file2Data
for (const Identity in file1Data.value) {
  if (file1Data.value.hasOwnProperty(Identity)) {
    const record1 = file1Data.value[Identity];
    let foundMatch = false;

    // Compare with all records in file2Data
    for (const matchingIdentity in file2Data.value) {
      if (file2Data.value.hasOwnProperty(matchingIdentity)) {
        const matchingRecord = file2Data.value[matchingIdentity];
        if (record1.Identity === matchingRecord.Identity) {
          compareRecords(record1, matchingRecord);
          foundMatch = true;
          break; // Exit the loop after finding a match
        }
      }
    }

    if (!foundMatch) {
      // Identity not found in file2Data
      console.log(`Identity "${record1.Identity}" not found in file2.json`);
      // Exclude unwanted keys here
      const filteredRecord = { ...record1 };
      for (const key in filteredRecord) {
        if (
          filteredRecord.hasOwnProperty(key) &&
          (
            key.startsWith('@') ||
            key === 'luname' ||
            key === 'keyref' ||
            key.startsWith('Obj')
          )
        ) {
          delete filteredRecord[key];
        }
      }
      mismatchedRecords.push({
        Identity: record1.Identity,
        Source: 'CfgEnvironment',
        MissingFrom: 'AccEnvironment',
        ...filteredRecord,
      });
    }
  }
}

// Check for records in file2Data that are not in file1Data
for (const Identity in file2Data.value) {
  if (file2Data.value.hasOwnProperty(Identity)) {
    const record2 = file2Data.value[Identity];
    let foundMatch = false;

    // Compare with all records in file1Data
    for (const matchingIdentity in file1Data.value) {
      if (file1Data.value.hasOwnProperty(matchingIdentity)) {
        const matchingRecord = file1Data.value[matchingIdentity];
        if (record2.Identity === matchingRecord.Identity) {
          foundMatch = true;
          break; // Exit the loop after finding a match
        }
      }
    }

    if (!foundMatch) {
      // Identity not found in file1Data
      console.log(`Identity "${record2.Identity}" not found in file1.json`);
      // Exclude unwanted keys here
      const filteredRecord = { ...record2 };
      for (const key in filteredRecord) {
        if (
          filteredRecord.hasOwnProperty(key) &&
          (
            key.startsWith('@') ||
            key === 'luname' ||
            key === 'keyref' ||
            key.startsWith('Obj')
          )
        ) {
          delete filteredRecord[key];
        }
      }
      mismatchedRecords.push({
        Identity: record2.Identity,
        Source: 'AccEnvironment',
        MissingFrom: 'CfgEnvironment',
        ...filteredRecord,
      });
    }
  }
}

// Save mismatched records to a JSON file
fs.writeFileSync('new_mismatchedRecords1.json', JSON.stringify(mismatchedRecords, null, 2));

console.log('Mismatched records saved to new_mismatchedRecords1.json');












// const fs = require('fs');

// // Read the JSON data from the first file
// const file1Data = JSON.parse(fs.readFileSync('example_cfg.json', 'utf8'));

// // Read the JSON data from the second file
// const file2Data = JSON.parse(fs.readFileSync('example_acc.json', 'utf8'));

// // Create an empty array to store mismatched records
// const mismatchedRecords = [];

// // Function to compare two records and highlight differences
// function compareRecords(record1, record2) {
//   const differences = {};
//   let match = true;

//   for (const key in record1) {
//     if (record1.hasOwnProperty(key) && record2.hasOwnProperty(key)) {
//       if (record1[key] !== record2[key]) {
//         differences[key] = {
//           CfgEnvironment: record1[key],
//           AccEnvironment: record2[key],
//         };
//         match = false;
//       }
//     }
//   }


//   if (!match) {
//     // Differences found, add the record to mismatchedRecords
//     mismatchedRecords.push({
//       Identity: record1.Identity,
//       differences,
//     });

    
//   }
// }

// // Compare records in file1Data with file2Data
// for (const Identity in file1Data.value) {
//   if (file1Data.value.hasOwnProperty(Identity)) {
//     const record1 = file1Data.value[Identity];
//     let foundMatch = false;

//     // Compare with all records in file2Data
//     for (const matchingIdentity in file2Data.value) {
//       if (file2Data.value.hasOwnProperty(matchingIdentity)) {
//         const matchingRecord = file2Data.value[matchingIdentity];
//         if (record1.Identity === matchingRecord.Identity) {
//           compareRecords(record1, matchingRecord);
//           foundMatch = true;
//           break; // Exit the loop after finding a match
//         }
//       }
//     }

//     if (!foundMatch) {
//       // Identity not found in file2Data
//       console.log(`Identity "${record1.Identity}" not found in file2.json`);
//       mismatchedRecords.push({
//         Identity: record1.Identity,
//         Source: 'CfgEnvironment',
//         MissingFrom: 'AccEnvironment',
//         ...record1,
//       });
//     }
//   }
// }

// // Check for records in file2Data that are not in file1Data
// for (const Identity in file2Data.value) {
//   if (file2Data.value.hasOwnProperty(Identity)) {
//     const record2 = file2Data.value[Identity];
//     let foundMatch = false;

//     // Compare with all records in file1Data
//     for (const matchingIdentity in file1Data.value) {
//       if (file1Data.value.hasOwnProperty(matchingIdentity)) {
//         const matchingRecord = file1Data.value[matchingIdentity];
//         if (record2.Identity === matchingRecord.Identity) {
//           foundMatch = true;
//           break; // Exit the loop after finding a match
//         }
//       }
//     }

//     if (!foundMatch) {
//       // Identity not found in file1Data
//       console.log(`Identity "${record2.Identity}" not found in file1.json`);
//       mismatchedRecords.push({
//         Identity: record2.Identity,
//         Source: 'AccEnvironment',
//         MissingFrom: 'CfgEnvironment',
//         ...record2,
//       });
//     }
//   }
// }

// // Save mismatched records to a JSON file
// fs.writeFileSync('mismatchedRecords.json', JSON.stringify(mismatchedRecords, null, 2));

// console.log('Mismatched records saved to mismatchedRecords.json');







// const fs = require('fs');

// // Read the JSON data from the first file
// const file1Data = JSON.parse(fs.readFileSync('example_cfg.json', 'utf8'));

// // Read the JSON data from the second file
// const file2Data = JSON.parse(fs.readFileSync('example_acc.json', 'utf8'));

// // Create an empty array to store mismatched records
// const mismatchedRecords = [];

// // Function to compare two records and highlight differences
// function compareRecords(record1, record2) {
//   const differences = {};
//   let match = true;

//   for (const key in record1) {
//     if (record1.hasOwnProperty(key) && record2.hasOwnProperty(key)) {
//       if (record1[key] !== record2[key]) {
//         differences[key] = {
//           CfgEnvironment: record1[key],
//           AccEnvironment: record2[key],
//         };
//         match = false;
//       }
//     }
//   }

//   if (!match) {
//     // Differences found, add the record to mismatchedRecords
//     mismatchedRecords.push({
//       Identity: record1.Identity,
//       differences,
//     });
//   }
// }

// // Compare records in file1Data with file2Data
// for (const Identity in file1Data.value) {
//   if (file1Data.value.hasOwnProperty(Identity)) {
//     const record1 = file1Data.value[Identity];
//     let foundMatch = false;

//     // Compare with all records in file2Data
//     for (const matchingIdentity in file2Data.value) {
//       if (file2Data.value.hasOwnProperty(matchingIdentity)) {
//         const matchingRecord = file2Data.value[matchingIdentity];
//         if (record1.Identity === matchingRecord.Identity) {
//           compareRecords(record1, matchingRecord);
//           foundMatch = true;
//           break; // Exit the loop after finding a match
//         }
//       }
//     }

//     if (!foundMatch) {
//       // Identity not found in file2Data
//       console.log(`Identity "${record1.Identity}" not found in file2.json`);
//       mismatchedRecords.push(record1); // Add the missing record to mismatchedRecords
//     }
//   }
// }

// // Check for records in file2Data that are not in file1Data
// for (const Identity in file2Data.value) {
//   if (file2Data.value.hasOwnProperty(Identity)) {
//     const record2 = file2Data.value[Identity];
//     let foundMatch = false;

//     // Compare with all records in file1Data
//     for (const matchingIdentity in file1Data.value) {
//       if (file1Data.value.hasOwnProperty(matchingIdentity)) {
//         const matchingRecord = file1Data.value[matchingIdentity];
//         if (record2.Identity === matchingRecord.Identity) {
//           foundMatch = true;
//           break; // Exit the loop after finding a match
//         }
//       }
//     }

//     if (!foundMatch) {
//       // Identity not found in file1Data
//       console.log(`Identity "${record2.Identity}" not found in file1.json`);
//       mismatchedRecords.push(record2); // Add the missing record to mismatchedRecords
//     }
//   }
// }

// // Save mismatched records to a JSON file
// fs.writeFileSync('mismatchedRecords.json', JSON.stringify(mismatchedRecords, null, 2));

// console.log('Mismatched records saved to mismatchedRecords.json');







// const fs = require('fs');
// const deepEqual = require('deep-equal');

// // Read the JSON data from the first file
// const file1Data = JSON.parse(fs.readFileSync('example_cfg.json', 'utf8'));

// // Read the JSON data from the second file
// const file2Data = JSON.parse(fs.readFileSync('example_acc.json', 'utf8'));

// // Create an array to store the differences
// const differences = [];

// // Function to deep compare two objects
// function deepCompare(obj1, obj2) {
//   return deepEqual(obj1, obj2, { strict: true });
// }

// // Compare records one by one
// for (const key in file1Data) {
//   if (file1Data.hasOwnProperty(key)) {
//     const record1 = file1Data[key];
//     const record2 = file2Data[key];

//     if (record2) {
//       if (!deepCompare(record1, record2)) {
//         differences.push({
//           Identity: key,
//           file1: record1,
//           file2: record2,
//         });
//       }
//     } else {
//       // Record not found in file2
//       console.log(`Identity "${key}" not found in file2.json`);
//     }
//   }
// }

// // Save differences to a JSON file
// fs.writeFileSync('differences.json', JSON.stringify(differences, null, 2));

// console.log('Differences saved to differences.json');




