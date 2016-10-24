import React from "react";

const PropertiesList = ({teamProps}) => {
    if (!teamProps) return <span>No properties for this team!</span>;
    return <ul>
        {teamProps.map((p) => <li key={p.name}>{p.name} - {p.value}</li>)}
    </ul>;
};

PropertiesList.propTypes = {
    teamProps: React.PropTypes.array
};

export default PropertiesList;
