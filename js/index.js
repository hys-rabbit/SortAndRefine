/**
 * テキスト絞り込み処理
 * @param {string} refineValue 
 * @description 入力された値を含む行データのみ表示する。
 */
function refine (refineValue) {
    getPrefecturesElementsArray().forEach(trElement => {
        // 行内の各列テキストをフィルターにかけ、入力値の有無でCSSを設定する。
        var trStyleDisplay = Array.prototype.slice.call(trElement.children).filter(e => e.innerText.includes(refineValue)).length > 0 ?  "" : "none";
        trElement.setAttribute("style",`display:${trStyleDisplay}`);
    });
}

/**
 * ソートSELECBOXデータ
 */
var sortSelectBox = [
    {   // 未選択
        "columnIndex": "",
        "order": ""
    },{ // 読み（昇順）
        "columnIndex": 1,
        "order": "asc"
    },{ // 読み（降順）
        "columnIndex": 1,
        "order": "desc"
    },{ // ローマ字（昇順）
        "columnIndex": 2,
        "order": "asc"
    },{ // ローマ字（降順）
        "columnIndex": 2,
        "order": "desc"
    },{ // 人口（昇順）
        "columnIndex": 3,
        "order": "asc"
    },{ // 人口（降順）
        "columnIndex": 3,
        "order": "desc"
    }
]

/**
 * 各項目のソート処理
 * @param {number} sortValue
 * @description 入力されたソート値を見て都道府県テーブルをソートする。
 */
function sort (sortValue) {
    // 入力値を数値に変換する。
    var sortValueInt = Number(sortValue);

    // 入力値が未選択もしくは許容していない値の場合、
    // 画面を再描画してデフォルトに戻す。
    if (sortValueInt < 1 || 6 < sortValueInt) {
        window.location.reload();
    }

    // ソートする項目のカラムインデックスとソートオーダーを変数に取得する。
    var index = sortSelectBox[sortValueInt].columnIndex;
    var order = sortSelectBox[sortValueInt].order;

    // ソートする項目のテキストとそれを含む行ノードを都道府県リストとして保持する。
    // 人口の場合は数値比較するのでカンマを除いた状態で保持する。
    prefectureList = [];
    getPrefecturesElementsArray().forEach(element => {
        var sortKey = index == 3 ?  
            Number(element.childNodes[index].innerText.replace(/,/g, '')) : 
            element.childNodes[index].innerText;
        prefectureList.push({
            sortKey: sortKey,
            node: element.cloneNode(true)
        });
    });

    // 都道府県リストを選択項目でソートする。
    prefectureList.sort(function(a, b){
        if (a.sortKey < b.sortKey) return order == "asc" ? -1 : 1;
        if (a.sortKey > b.sortKey) return order == "asc" ? 1 : -1;
        return 0;
    });

    // テーブルボディ内を一度消し、
    // 保持しておいて行ノードでテーブルを再構築する。
    document.querySelector("table#prefectures_data tbody").innerHTML = '';
    prefectureList.forEach(prefecture => {
        document.querySelector("table#prefectures_data tbody").appendChild(prefecture.node);
    });
}

/**
 * 都道府県テーブル要素取得
 * @description 都道府県テーブルのtbody以下のtr要素を配列形式で取得する。
 */
function getPrefecturesElementsArray () {
    return Array.prototype.slice.call(
        document.querySelector("table#prefectures_data tbody").children
    );
}