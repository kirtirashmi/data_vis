// import React, { useState, useEffect } from 'react';
// import './App.css'; // Import your custom CSS file
// import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

// function Users() {
//   const [data, setData] = useState([]);
//   const [additionalData, setAdditionalData] = useState([]);
//   const [selectedSource, setSelectedSource] = useState('');
//   const [selectedMissingFrom, setSelectedMissingFrom] = useState('');
//   const [oppositeSource, setOppositeSource] = useState('');

//   useEffect(() => {
//     // Fetch data from the JSON file
//     fetch('./new_mismatchedRecords1.json') // Replace with the correct path to your JSON file
//       .then((response) => response.json())
//       .then((jsonData) => {
//         const mainData = jsonData.filter(
//           (item) =>
//             item.Source === 'AccEnvironment' || item.Source === 'CfgEnvironment'
//         );
//         setData(mainData);

//         const newData = jsonData.filter(
//           (item) => item.differences !== undefined
//         );
//         setAdditionalData(newData);
//       });
//   }, []);

//   // Function to filter data based on the selected source
//   const filteredData = data.filter(
//     (item) =>
//       (selectedSource === '' || item.Source === selectedSource) &&
//       (selectedMissingFrom === '' || item.MissingFrom === selectedMissingFrom)
//   );

//   // Function to filter data for the second table based on the opposite source
//   const secondTableData = data.filter(
//     (item) => (oppositeSource === '' || item.Source === oppositeSource)
//   );

//   // Function to get the keys from the differences object as column names
//   const getColumnNames = () => {
//     const columnNames = new Set();
//     additionalData.forEach((item) => {
//       if (item.differences) {
//         Object.keys(item.differences).forEach((key) => {
//           columnNames.add(key);
//         });
//       }
//     });
//     return Array.from(columnNames);
//   };


// // Function to get data for the third table based on the selected target
// const getThirdTableData = () => {
//   return additionalData.filter((item) => {
//     const differencesForTarget = item.differences;
//     return differencesForTarget && differencesForTarget[selectedMissingFrom] !== undefined;
//   });
// };

  
  
//   return(
//     <div>
//         {/* Source Dropdown */}
//         <main className="main-container">
//         <div className="table-responsive">
//         <div className="">
//                 <label htmlFor="sourceSelect" className="form-label">
//                   Select Source:
//                 </label>
//                 <select
//                   id="sourceSelect"
//                   className="form-select"
//                   onChange={(e) => {
//                     setSelectedSource(e.target.value);
//                     setOppositeSource(
//                       e.target.value === 'CfgEnvironment'
//                         ? 'AccEnvironment'
//                         : 'CfgEnvironment'
//                     );
//                   }}
//                 >
                  
//                   <option value="CfgEnvironment">CfgEnvironment</option>
//                   <option value="AccEnvironment">AccEnvironment</option>
//                 </select>
//               </div>
//               </div>
//               </main>

//               {/* MissingFrom Dropdown */}
//               <main className="main-container">
//               <div className="table-responsive">
//               <div className="">
//                 <label htmlFor="missingFromSelect" className="form-label">
//                   Select Target:
//                 </label>
//                 <select
//                   id="missingFromSelect"
//                   className="form-select"
//                   onChange={(e) => setSelectedMissingFrom(e.target.value)}
//                 >
//                   <option value="AccEnvironment">AccEnvironment</option>
//                   <option value="CfgEnvironment">CfgEnvironment</option>
                  
//                 </select>
//               </div>
//               </div>
//               </main>
              

//         {/* Main Content */}
//         <main className="main-container">
//           <div className="table-responsive">
//             <h1 className="">Missing Data in {oppositeSource}</h1>
//             <div className="table-container">
              

//               <table className="table table-bordered table-striped">
//                 <thead className="thead-dark">
//                   <tr>
//                     {filteredData.length > 0 &&
//                       Object.keys(filteredData[0]).map((key, index) => (
//                         <th key={index}>{key}</th>
//                       ))}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredData.map((item, index) => (
//                     <tr key={index}>
//                       {Object.keys(item).map((key, innerIndex) => (
//                         <td key={innerIndex}>
//                           {item[key] !== null ? item[key].toString() : ''}
//                         </td>
//                       ))}
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             {/* Second Table */}
//             <h1 className="table-responsive">
//               Additional Data in {oppositeSource}
//             </h1>
//             <div className="table-container">
//               <table className="table table-bordered table-striped">
//                 <thead className="thead-dark">
//                   <tr>
//                     {secondTableData.length > 0 &&
//                       Object.keys(secondTableData[0]).map((key, index) => (
//                         <th key={index}>{key}</th>
//                       ))}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {secondTableData.map((item, index) => (
//                     <tr key={index}>
//                       {Object.keys(item).map((key, innerIndex) => (
//                         <td key={innerIndex}>
//                           {item[key] !== null ? item[key].toString() : ''}
//                         </td>
//                       ))}
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             {/* Third Table */}
//       <h1 className="table-responsive">Mismatched Data in Environments</h1>
//       <div className="table-container">
//         <table className="table table-bordered table-striped">
//           <thead className="thead-dark">
//             <tr>
//               <th>Identity</th>
//               {getColumnNames().map((columnName) => (
//                 <th key={columnName}>{columnName}</th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {getThirdTableData().map((item, index) => (
//               <tr key={index}>
//                 <td>{item.Identity}</td>
//                 {getColumnNames().map((columnName, columnIndex) => (
//                   <td key={columnIndex}>
//                     {item.differences &&
//                       item.differences[selectedMissingFrom] &&
//                       item.differences[selectedMissingFrom][columnName] !== null
//                       ? item.differences[selectedMissingFrom][columnName].toString()
//                       : ''}
//                   </td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//             </div>
//           </div>
//         </main>

//         </div>

//  );
      
      
// }

// export default Users;

























import React, { useState, useEffect } from 'react';
import './App.css'; // Import your custom CSS file
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

function Users() {
  const [data, setData] = useState([]);
  const [additionalData, setAdditionalData] = useState([]);
  const [selectedSource, setSelectedSource] = useState('');
  const [selectedMissingFrom, setSelectedMissingFrom] = useState('');
  const [oppositeSource, setOppositeSource] = useState('');

  useEffect(() => {
    // Fetch data from the JSON file
    fetch('./new_mismatchedRecords1.json') // Replace with the correct path to your JSON file
      .then((response) => response.json())
      .then((jsonData) => {
        const mainData = jsonData.filter(
          (item) =>
            item.Source === 'AccEnvironment' || item.Source === 'CfgEnvironment'
        );
        setData(mainData);

        const newData = jsonData.filter(
          (item) => item.differences !== undefined
        );
        setAdditionalData(newData);
      });
  }, []);

  // Function to filter data based on the selected source
  const filteredData = data.filter(
    (item) =>
      (selectedSource === '' || item.Source === selectedSource) &&
      (selectedMissingFrom === '' || item.MissingFrom === selectedMissingFrom)
  );

  // Function to filter data for the second table based on the opposite source
  const secondTableData = data.filter(
    (item) => (oppositeSource === '' || item.Source === oppositeSource)
  );

  // Function to get the keys from the differences object as column names
  const getColumnNames = () => {
    const columnNames = new Set();
    additionalData.forEach((item) => {
      if (item.differences) {
        Object.keys(item.differences).forEach((key) => {
          columnNames.add(key);
        });
      }
    });
    return Array.from(columnNames);
  };

  

    
  return(
    <div>
        {/* Source Dropdown */}
        <main className="main-container">
        <div className="table-responsive">
        <div className="">
                <label htmlFor="sourceSelect" className="form-label">
                  Select Source:
                </label>
                <select
                  id="sourceSelect"
                  className="form-select"
                  onChange={(e) => {
                    setSelectedSource(e.target.value);
                    setOppositeSource(
                      e.target.value === 'CfgEnvironment'
                        ? 'AccEnvironment'
                        : 'CfgEnvironment'
                    );
                  }}
                >
                  
                  <option value="CfgEnvironment">CFG Environment</option>
                  <option value="AccEnvironment">ACC Environment</option>
                </select>
              </div>
              </div>
              </main>

              {/* MissingFrom Dropdown */}
              <main className="main-container">
              <div className="table-responsive">
              <div className="">
                <label htmlFor="missingFromSelect" className="form-label">
                  Select Target:
                </label>
                <select
                  id="missingFromSelect"
                  className="form-select"
                  onChange={(e) => setSelectedMissingFrom(e.target.value)}
                >
                  <option value="AccEnvironment">ACC Environment</option>
                  <option value="CfgEnvironment">CFG Environment</option>
                  
                </select>
              </div>
              </div>
              </main>
              

        {/* Main Content */}
        <main className="main-container">
          <div className="table-responsive">
            <h1 className="">Missing Data in {oppositeSource}</h1>
            <div className="table-container">
            <div className="scrolling-table-container">
              <table className="table table-bordered table-striped">
                <thead className="thead-dark">
                  <tr>
                    {filteredData.length > 0 &&
                      Object.keys(filteredData[0]).map((key, index) => (
                        <th key={index}>{key}</th>
                      ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((item, index) => (
                    <tr key={index}>
                      {Object.keys(item).map((key, innerIndex) => (
                        <td key={innerIndex}>
                          {item[key] !== null ? item[key].toString() : ''}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            </div>
            

            {/* Second Table */}
            <h1 className="table-responsive">
              Additional Data in {oppositeSource}
            </h1>
            <div className="table-container">
            <div className="scrolling-table-container">
              <table className="table table-bordered table-striped">
                <thead className="thead-dark">
                  <tr>
                    {secondTableData.length > 0 &&
                      Object.keys(secondTableData[0]).map((key, index) => (
                        <th key={index}>{key}</th>
                      ))}
                  </tr>
                </thead>
                <tbody>
                  {secondTableData.map((item, index) => (
                    <tr key={index}>
                      {Object.keys(item).map((key, innerIndex) => (
                        <td key={innerIndex}>
                          {item[key] !== null ? item[key].toString() : ''}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
            </div>

            {/* Third Table */}
            <h1 className="table-responsive">Mismatched Data in Environments</h1>
            <div className="table-container">
            <div className="scrolling-table-container">
              <table className="table table-bordered table-striped">
                <thead className="thead-dark">
                  <tr>
                    <th>Identity</th>
                    {getColumnNames().map((columnName) => (
                      <th key={columnName}>{columnName}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {additionalData.map((item, index) => (
                    <tr key={index}>
                      <td>{item.Identity}</td>
                      {getColumnNames().map((columnName, columnIndex) => (
                        <td key={columnIndex}>
                          {item.differences &&
                          item.differences[columnName] &&
                          item.differences[columnName].AccEnvironment !== null
                            ? item.differences[columnName].AccEnvironment.toString()
                            : ''}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            </div>
          </div>
        </main>

        </div>

 );
      
      
}

export default Users;