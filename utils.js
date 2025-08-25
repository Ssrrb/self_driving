//linear interpolation function
function lerp(A, B, t) {
    return A + (B - A) * t;
}

function getIntersection(A, B, C, D) {
    // Correct 2D segment intersection using cross products:
    // denom = (B-A) x (D-C)
    // t = (C-A) x (D-C) / denom
    // u = (C-A) x (B-A) / denom
    const BAx = B.x - A.x;
    const BAy = B.y - A.y;
    const DCx = D.x - C.x;
    const DCy = D.y - C.y;
    const CAx = C.x - A.x;
    const CAy = C.y - A.y;

    const denom = BAx * DCy - BAy * DCx;
    if (denom === 0) return null; // Parallel or collinear

    const tTop = CAx * DCy - CAy * DCx;
    const uTop = CAx * BAy - CAy * BAx;

    const t = tTop / denom;
    const u = uTop / denom;

    if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
        return {
            x: lerp(A.x, B.x, t),
            y: lerp(A.y, B.y, t),
            offset: t
        };
    }
    return null; // No intersection
}

function polysIntersect(poly1, poly2){
    for(let i=0;i<poly1.length;i++){
        for(let j=0;j<poly2.length;j++){
            const touch=getIntersection(
                poly1[i],
                poly1[(i+1)%poly1.length],
                poly2[j],
                poly2[(j+1)%poly2.length]
            );
            if(touch){
                return true;
            }
        }
    }
    return false;
}

function getRGBA(value){
    const alpha=Math.abs(value);
    const R=value<0?0:255;
    const G=R;
    const B=value>0?0:255;
    return "rgba("+R+","+G+","+B+","+alpha+")";
}
