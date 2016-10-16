import React from "react";
import {Link} from "react-router";

const TeamList = ({teams}) => {
    if (teams === null) return <span>Loading...</span>;
    if (teams.length === 0) return <span>No teams!</span>;

    teams = teams.map((t) => (
        <li key={t.license}>
            <Link to={"/team/" + t.license}>{t.license}: {t.name}</Link>
        </li>
    ));

    return (
        <ul>
            {teams}
        </ul>
    );
};

TeamList.propTypes = {
    teams: React.PropTypes.array
};

export default TeamList;
