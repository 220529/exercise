const fields = ["positionId", "positionName", "workYear", "salary", "companyName", "businessZone", "city", "companyLogo", "companySize", "createTime", "district", "education", "financeStage", "industryField", "positionAddress"];

const fetchPositions = async () => {
    const positions = [];
    const res = await fetch("../positions.json").then(e => e.json());
    console.log("fetchPositions", res);
    if (res?.state === 1 && res?.content?.positionList) {
        res?.content?.positionList.forEach(element => {
            const position = {};
            fields.forEach(field => {
                position[field] = element[field]
            })
            positions.push(position);
        });
    }
    console.log("positions", positions);
}

fetchPositions()