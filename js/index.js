/**
 * ローマ字による絞り込み処理
 * @param {string} refineValue 
 */
function refine (refineValue) {
    document.querySelector("table#prefectures_data tbody")
        .childNodes.forEach(element => {
        if (element.nodeName != "#text") {
            element.style.display = element.childNodes[2].innerText.includes(refineValue) ? "" : "none";
        }
    });
}

/**
 * 各項目のソート処理
 * @param {number} sortValue
 * - 0 -> 未選択
 * - 1:0 -> 読み（昇順）
 * - 1:1 -> 読み（降順）
 * - 2:0 -> ローマ字（昇順）
 * - 2:1 -> ローマ字（降順）
 * - 3:0 -> 人口（昇順）
 * - 3:1 -> 人口（降順）
 */
function sort (sortValue) {

    if (sortValue == "0") {
        // 未選択の場合処理終了
        return;
    }

    // ソート項目と昇順or降順の取得
    var index = Number(sortValue.split(":")[0]);
    var isUp = sortValue.split(":")[1] == "0";

    // テーブルノードを保持
    prefectureList = [];
    document.querySelector("table#prefectures_data tbody")
        .childNodes.forEach(element => {
        if (element.nodeName != "#text") {
            var sortKey = element.childNodes[index].innerText;
            if (index == 3) {
                // 人口の場合数値比較するので数値変換
                sortKey = Number(sortKey.replace(/,/g, ''));
            }

            prefectureList.push({
                sortKey: sortKey,
                node: element.cloneNode(true)
            });
        }
    });

    // テーブルノードをソート
    prefectureList.sort(function(a, b){
        if (a.sortKey < b.sortKey) return isUp ? -1 : 1;
        if (a.sortKey > b.sortKey) return isUp ? 1 : -1;
        return 0;
    });

    // テーブルの再構築
    document.querySelector("table#prefectures_data tbody").innerHTML = '';
    prefectureList.forEach(element => {
        document.querySelector("table#prefectures_data tbody").appendChild(element.node);
    });
}