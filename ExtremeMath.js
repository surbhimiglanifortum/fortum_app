export const computeDistance = ([prevLat, prevLong], [lat, long])=> {
    const prevLatInRad = toRad(prevLat);
    const prevLongInRad = toRad(prevLong);
    const latInRad = toRad(lat);
    const longInRad = toRad(long);
    // console.log(prevLat,prevLong,lat,long)
    // console.log("copute distance")
    return (
        // In kilometers
        6377.830272 *
        Math.acos(
            Math.sin(prevLatInRad) * Math.sin(latInRad) +
            Math.cos(prevLatInRad) * Math.cos(latInRad) * Math.cos(longInRad - prevLongInRad),
        )
    ).toFixed(2);
}

export function toRad(angle) {
    return (angle * Math.PI) / 180;
}