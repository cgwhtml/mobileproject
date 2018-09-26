define("form/component/table",
function(p, s, u) { (function(h, e, d, c) {
    var a = function(a, b) {
        this.$element = a;
        this.defaults = {
            area: "area",
            current: "current",
            rows: 2,
            cols: 2,
            thead: !0,
            tfoot: !1,
            tableClass: "table table_bordered",
            headClass: "theader",
            bodyClass: "j_tablelayout",
            footClass: "foot",
            separator: "_",
            minColWidth: 60,
            defaultWidth: 60,
            maxColWidth: 2000,
            tdArray: [],
            thArray: [],
            beforeChangeCell: function(b, a) {
                return true;
            },
            afterDeleteCol: function(b) {},
            afterDeleteRow: function(b) {},
            afterCreateCell: function(b, a) {},
            afterCreateBodyTd: function(b, a, c) {},
            afterChangeWidth: function(b, a) {}
        };
        this.options = h.extend({},this.defaults, b);
        this.persist = {
            storage: [],//每个元素对应tr里面的children
            place: [],
            selection: [],//选中的td的位置集合
            selected: [],//选中的td集合
            range: {
                start: null,
                end: null
            },
            mouse: {
                status: 0	//1表示鼠标当前左键按下还没松开，0表示松开
            }
        };
    };
    a.prototype = {
        init: function() {
            this.renderTable();
            this.events();
            return this;
        },
        events: function() {
            var a = this.$element,
            b = this;
            a.on("mouseover", "td",
            function(a) {
                b.onCellMouseOver(a);
            });
            a.on("mousedown", "td",
            function(a) {
                if (1 == a.which) b.onCellMouseLeftDown(a);
                if (3 == a.which) b.onCellMouseRightDown(a);
            });
            h(d).on("mouseup",
            function(a) {
                b.onCellMouseUp(a);
            });
            h(d).on("mousedown",
            function(a) {
                a = a.target;
                "td" == a.tagName.toLowerCase() || h(a).hasClass("j_layout_menu") || b.clearSelection();
            });
            a.contextmenu({
                target: "#context-menu",
                onItem: function(a, c) {
                    h(c.target).parent().hasClass("disabled") || b.rightEvents(h(c.target).attr("type"));
                },
                before: function(a, c) {
                    b.initRightMenu();
                }
            });
        },
        rightEvents: function(a) {
            switch (a) {
            case "merge":
                this.merge();
                break;
            case "clearMerge":
                this.clearMerge();
                break;
            case "deleteRow":
                this.deleteRow();
                break;
            case "deleteCol":
                this.deleteCol();
                break;
            case "addRow":
                this.addRow();
                break;
            case "addCol":
                this.addCol();
                break;
            case "clearSelect":
                this.clearSelection();
            }
        },
        initRightMenu: function() {
            var a = this.persist.selection,
            b = this.persist.selected,
            c = this.persist.place,
            d = h(".dropdown-menu");
            a && 0 != a.length ? d.find("li").removeClass("disabled") : (d.find("a[type\x3d'deleteCol']").parent().addClass("disabled"), d.find("a[type\x3d'deleteRow']").parent().addClass("disabled"), d.find("a[type\x3d'merge']").parent().addClass("disabled"), d.find("a[type\x3d'clearSelect']").parent().addClass("disabled"));
            c && 0 < c.length ? d.find("a[type\x3d'clearMerge']").parent().removeClass("disabled") : d.find("a[type\x3d'clearMerge']").parent().addClass("disabled");
            1 == b.length && d.find("a[type\x3d'merge']").parent().addClass("disabled");
        },
        _checkMerge: function() {
            return 1 < this.persist.selection.length ? !0 : !1
        },
        renderTable: function() {
            var a = this.$element,
            b = this.options,
            c = "\x3ctable class\x3d'" + b.tableClass + "' \x3e";
            if (b.tdArray && 0 < b.tdArray.length) for (var c = c + ("\x3ctbody class \x3d'" + b.bodyClass + "'\x3e"), d = 0; d < b.rows; d++) c += "\x3ctr\x3e\x3c/tr\x3e";
            else for (c += "\x3ctbody class \x3d'" + b.bodyClass + "'\x3e", d = 0; d < b.rows; d++) {
                for (var c = c + "\x3ctr\x3e",
                e = 0; e < b.cols; e++) c += "\x3ctd\x3e\x3c/td\x3e";
                c += "\x3c/tr\x3e"
            }
            c += "\x3c/tbody\x3e";
            if (b.tfoot) {
                c += "\x3ctfoot class\x3d'" + b.footClass + "'\x3e\x3ctr\x3e";
                for (d = 0; d < b.cols; d++) c += "\x3ctd\x3e\x3c/td\x3e";
                c += "\x3c/tr\x3e\x3c/tfoot\x3e"
            }
            a.html(c);
            this.$table = a.find("table");
            if (b.tdArray && 0 < b.tdArray.length) this.initBody();
            else for (a = this.$table.find("tbody tr"), d = 0; d < a.length; d++) b = h(a[d]).children(),
            this.persist.storage[d] = b;
            this.options.afterCreateCell(this, this.$table.find("tbody td"));
            this.initHeader();
        },
        initBody: function() {
            var a = this.options.tdArray,
            b = this.persist.storage;
            if (a && 0 < a.length) for (var c = 0; c < a.length; c++) {
                var d = a[c];
                "string" == typeof d && (d = JSON.parse(d));
                if (d) {
                    var e = d.coordinate.split(this.options.separator),
                    n = ~~e[0],
                    e = ~~e[1];
                    b[n] || (b[n] = []);
                    if (0 < d.rowSpan && 0 < d.colSpan) {
                        var l = h("\x3ctd rowspan\x3d'" + d.rowSpan + "' colspan\x3d'" + d.colSpan + "'\x3e\x3c/td\x3e");
                        this.$table.find("tbody tr").eq(n).append(l);
                        this.options.afterCreateBodyTd(this, l, d);
                        b[n][e] = l[0]
                    } else b[n][e] = null
                }
            }
        },
        initHeader: function(a) {
            a = this.options;
            if (a.thead) {
                this.$table.find("thead").remove();
                var b = "";
                a.headClass = 2 == a.cols ? a.headClass.concat(" two-columns") : a.headClass.replace("two-columns", "");//解决IE8设置了table-layout:fixed不铺满的情况
                a.headClass = 1 == a.cols ? a.headClass.concat(" one-columns") : a.headClass.replace("one-columns", "");
                for (var b = b + ("\x3cthead class\x3d'" + a.headClass + "'\x3e\x3ctr\x3e"), c = 0; c < a.cols; c++) {
                    a.thArray[c] = a.thArray[c] ? a.thArray[c] : a.minColWidth;
                    var d = parseInt(c / 26),
                    d = d ? d + "": "";
                    b = b + ("\x3cth style\x3d'width:" + a.thArray[c] + "px'\x3e" + String.fromCharCode(65 + c % 26) + d + "\x3c/th\x3e");//生成head的头信息，A,B,C...
                }
                this.$table.prepend(b + "\x3c/tr\x3e\x3c/thead\x3e");
                b = a.maxColWidth;
                //2 == a.cols && (this.$table.find("thead\x3etr\x3eth:last").attr("style", ""), b = 510);
            }
            this.options.afterChangeWidth(this, a.thArray);
            this.resizable(b);//暂时不调用表格拖拉缩放功能
        },
        onCellMouseOver: function(a) {
            a = a.target;
            var b = this.persist;
            0 != b.mouse.status && (b.range.end = this.getCellIndex(a), this.clearSelection(), this.selectCell(), this.renderSelection());
        },
        onCellMouseLeftDown: function(a) {
            a = a.target;
            var b = this.persist;
            b.mouse.status = 1;
            b.range.start = this.getCellIndex(a);
            h(a).trigger("mouseover");
        },
        onCellMouseRightDown: function(a) {
            a = a.target;
            var b = this.persist;
            if (h(a).hasClass(this.options.area)) return ! 0;
            b.range.start = this.getCellIndex(a);
            b.range.end = this.getCellIndex(a);
            this.clearSelection();
            this.selectCell();
            this.renderSelection();
        },
        onCellMouseUp: function() {
            this.persist.mouse.status = 0;
        },
        getRange: function() {
            var a = this.persist,
            b = this.options;
            if (a.range.start && a.range.end) {
                var c = a.range.start.split(b.separator),
                d = parseInt(c[0]),
                c = parseInt(c[1]),
                e = a.range.end.split(b.separator),
                b = parseInt(e[0]),
                h = parseInt(e[1]),
                l;
                c > h ? (l = c + a.storage[d][c].colSpan - 1, e = h) : c < h ? (l = h + a.storage[b][h].colSpan - 1, e = c) : d > b ? (l = c + a.storage[d][c].colSpan - 1, e = h) : d < b ? (l = h + a.storage[b][h].colSpan - 1, e = c) : e = l = c;
                d > b ? (a = d + a.storage[d][c].rowSpan - 1, d = b) : d < b ? a = b + a.storage[b][h].rowSpan - 1 : c > h ? (a = d + a.storage[d][c].rowSpan - 1, d = b) : c < h ? a = b + a.storage[b][h].rowSpan - 1 : d = a = d;
                return this._getMaxRange({
                    minX: e,
                    maxX: l,
                    minY: d,
                    maxY: a
                })
            }
            return {}
        },
        _getMaxRange: function(a) {
            for (var b = this.persist,
            c = a.minX,
            d = a.maxX,
            e = a.minY,
            n = a.maxY,
            l = c,
            m = d,
            q = e,
            p = n; e <= n; e++) if (b.storage[e]) for (var v = c; v <= d; v++) {
                var s = this.findCell(e, v),
                u = s.colSpan,
                D = s.rowSpan; (1 < u || 1 < D) && -1 == h.inArray(s, b.place) && (b.place.push(s), s = this.getCellIndex(s).split(this.options.separator), 1 < u && (m = m > ~~s[1] + u - 1 ? m: ~~s[1] + u - 1, l = l < ~~s[1] ? l: ~~s[1]), 1 < D && (p = p > ~~s[0] + D - 1 ? p: ~~s[0] + D - 1, q = q < ~~s[0] ? q: ~~s[0]))
            }
            b = {
                minX: l,
                maxX: m,
                minY: q,
                maxY: p
            };
            return this._checkRange(a, b) ? b: this._getMaxRange(b)
        },
        _checkRange: function(a, b) {
            return a.minX == b.minX && a.maxX == b.maxX && a.minY == b.minY && a.maxY == b.maxY
        },
        clearSelection: function() {
            var a = this.persist,
            b = this.options;
            if (a.selection || 0 < a.selection.length) for (var c = 0; c < a.selection.length; c++) {
                var d = a.selection[c].split(b.separator),
                e = d[0],
                d = d[1];
                a.storage[e] && a.storage[e][d] && a.storage[e][d].setAttribute("class", "");
            }
            a.selection = [];
            a.selected = [];
            a.place = [];
        },
        selectCell: function() {
            for (var a = this.persist,
            b = this.getRange(), c = b.minX, d = b.maxX, e = b.maxY, b = b.minY; b <= e; b++) for (var h = c; h <= d; h++) a.selection.push(b + this.options.separator + h),
            a.storage[b][h] && a.selected.push(a.storage[b][h])
        },
        renderSelection: function() {
            for (var a = this.persist,
            b = this.options,
            c = 0; c < a.selection.length; c++) {
                var d = a.selection[c].split(b.separator),
                e = d[0],
                d = d[1];
                a.storage[e][d] && a.storage[e][d].setAttribute("class", b.area)
            }
        },
        merge: function() {
            var a = this.persist,
            b = this.options;
            if (!this.options.beforeChangeCell(this, this.persist.selected)) return ! 1;
            if (this._checkMerge()) {
            	for (var c = this._selectionTrans2ArrayStack(), d = 0, e = 0, h = 0; h < c[0].length; h++) {
                    var l = c[0][h].split(b.separator),
                    m = l[0],
                    l = l[1];
                    a.storage[m][l] && (d += a.storage[m][l].colSpan)
                }
                for (h = 0; h < c.length; h++) for (var q = 0; q < c[h].length; q++) l = c[h][q].split(b.separator),
                m = l[0],
                l = l[1],
                a.storage[m][l] && 0 === q && (e += a.storage[m][l].rowSpan, 1 < c[h][0].rowSpan && (h = h + a.storage[m][l].rowSpan - 1));
                a.place = [];
                a.selected = [];
                for (h = 0; h < c.length; h++) for (q = 0; q < c[h].length; q++) l = c[h][q].split(b.separator),
                m = l[0],
                l = l[1],
                a.storage[m][l] && (0 === h && 0 === q ? (a.place.push(a.storage[m][l]), a.selected.push(a.storage[m][l]), a.storage[m][l].rowSpan = e, a.storage[m][l].colSpan = d, a.range.start = c[h][q], a.range.end = c[h][q]) : (a.storage[m][l].parentNode.removeChild(a.storage[m][l]), a.storage[m][l] = null))
            }
        },
        clearMerge: function() {
            var a = this.persist,
            b = a.place;
            if (!this.options.beforeChangeCell(this, this.persist.selected)) return ! 1;
            if (b && 0 != b.length) {
                for (var c = 0; c < b.length; c++) {
                    for (var e = b[c], r = this.getCellIndex(e).split(this.options.separator), n, l = 0; l < e.rowSpan; l++) {
                        n = 0 === l ? e.parentNode: h(n).next()[0];
                        for (var m = 0; m < e.colSpan; m++) if (0 !== m || 0 !== l) {
                            var q = d.createElement(e.tagName.toLowerCase()),
                            p = this.getPreviousSiblingStorageElementNotNull(~~r[0] + l, ~~r[1] + m);
                            p ? this.nextSibling(p) ? n.insertBefore(q, this.nextSibling(p)) : n.appendChild(q) : this.firstChild(n) ? n.insertBefore(q, this.firstChild(n)) : n.appendChild(q);
                            a.storage[~~r[0] + l][~~r[1] + m] = q;
                            a.selected.push(q);
                            this.options.afterCreateCell(this, h(q));
                            q.setAttribute("class", this.options.area)
                        }
                    }
                    e.rowSpan = 1;
                    e.colSpan = 1
                }
                a.place = []
            }
        },
        deleteRow: function(a) {
            if (!this.options.beforeChangeCell(this, this.persist.selected)) return ! 1;
            a = this._selectionTrans2ArrayStack();
            for (var b, c = 0; c < a.length; c++) {
                var d = a[c][0].split(this.options.separator);
                0 === c && (b = new Number(d[0]));
                //tr包含选中的字段控件，删除之后要清空右侧编辑内容
                this.$table.find("tbody tr").eq(b).find(".field_active").length>0 &&
                $("#edit_widget").html('<div class="form_edit_content"><div class="widget_warn"><span class="warn_icon"></span><span>请先选择控件</span></div></div>');
                this._deleteRowHandler(b, new Number(d[1]));
                this.options.rows--;
            }
            this.clearSelection();
            this.options.afterDeleteRow(this)
        },
        _deleteRowHandler: function(a, b, c) {
            var e = this.persist;
            b = e.storage[a][b];
            for (var r = 0; r < e.storage[a].length; r++) {
                var n = e.storage[a][r];
                if (n) {
                    if (1 < n.rowSpan) {
                        var l = this.nextRow(b.parentNode),
                        m = d.createElement(n.tagName.toLowerCase());
                        m.rowSpan = n.rowSpan - 1;
                        m.colSpan = n.colSpan;
                        if (0 === r) l.insertBefore(m, this.firstChild(l));
                        else {
                            for (var n = 0,
                            q = e.storage[a + 1][r - 1]; ! q;) n++,
                            q = 0 > r - 1 - n ? this.firstChild(l) : e.storage[a][r - 1 - n];
                            l.insertBefore(m, this.nextSibling(q))
                        }
                        e.storage[a + 1][r] = m;
                        this.options.afterCreateCell(this, h(m))
                    }
                } else {
                    l = a - 1;
                    if ( - 1 !== l) for (; ! e.storage[l][r] && (l--, -1 !== l););
                    if ( - 1 !== l) {
                        if (e.storage[l][r]) if (1 < e.storage[l][r].rowSpan) e.storage[l][r].rowSpan--,
                        1 < e.storage[l][r].colSpan && (r += e.storage[l][r].colSpan - 1);
                        else if (0 < r) if (e.storage[a][r - 1]) r += e.storage[a][r - 1].colSpan - 1 - 1;
                        else {
                            l = a - 1;
                            if ( - 1 !== l) for (; ! e.storage[l][r - 1] && (l--, -1 !== l););
                            e.storage[l][r - 1] && (e.storage[l][r - 1].rowSpan--, r += e.storage[l][r - 1].colSpan - 2)
                        }
                    } else r += e.storage[a][r - 1].colSpan - 1 - 1
                }
            }
            e.storage.splice(a, 1); ! 0 === c ? (l = this.getRow(a), l.parentNode.removeChild(l)) : b.parentNode.parentNode.removeChild(b.parentNode)
        },
        deleteCol: function() {
            if (!this.options.beforeChangeCell(this, this.persist.selected)) return ! 1;
            if (this.persist.selection && 0 < this.persist.selection.length) for (var a, b, c = this._selectionTrans2ArrayStack(), d = 0; d < c[0].length; d++) {
            	var e = c[0][d].split(this.options.separator);
                0 === d && (a = new Number(e[0]), b = new Number(e[1]));
                this._deleteColHandler(a, b);
                this.options.thArray.splice(b, 1);
                this.options.cols--
            }
            this.clearSelection();
            this.initHeader();
            this.options.afterDeleteCol(this)
        },
        _deleteColHandler: function(a, b) {
            for (var c = this.persist,
            d = 0; d < c.storage.length; d++) {
                var e = c.storage[d][b];
                //td包含选中的字段控件，删除之后要清空右侧编辑内容
                $(e).find(".field_active").length>0 &&
                $("#edit_widget").html('<div class="form_edit_content"><div class="widget_warn"><span class="warn_icon"></span><span>请先选择控件</span></div></div>');
                if (e) 1 < e.colSpan ? e.colSpan -= 1 : (c.storage[d].splice(b, 1), e.parentNode.removeChild(e));
                else {
                    var e = !1,
                    h = b;
                    if (0 <= h) for (; ! c.storage[d][h] && !(h--, 0 > h););
                    if (0 <= h) {
                        var l = c.storage[d][h].rowSpan;
                        if (c.storage[d][h].colSpan + h > b && 1 < c.storage[d][h].colSpan) {
                            c.storage[d][h].colSpan--;
                            if (1 < l) {
                                for (h = 1; h < l; h++) c.storage[d + h].splice(b, 1);
                                d += l - 1
                            } else e = !0;
                            c.storage[d - l + 1].splice(b, 1)
                        }
                    } ! 1 === e && c.storage[d].splice(b, 1)
                }
            }
        },
        addCol: function() {
            var a = this.persist;
            /*if(a.storage[0].length>6){
            	art.dialog({content: '表格最多添加七列！',icon: 'warning',time: 1.5}); 
            	return false;
            }*/
            if (!this.options.beforeChangeCell(this, this.persist.selected)) return ! 1;
            a.selection && 0 < a.selection.length ? (a = this._selectionTrans2ArrayStack(), a = this.index2Obj(a[0][a[0].length - 1]), this._addColHandler(a.y, a.x)) : this._addLastColHandler();
            this.options.cols++;
            this.initHeader()
        },
        _addLastColHandler: function() {
            for (var a = this.persist.storage,
            b = [], c = 0; c < a.length; c++) {
                var e = d.createElement("td");
                a[c].push(e);
                this.getRow(c).appendChild(e);
                b.push(e)
            }
            this.options.thArray.push(this.options.minColWidth);
            this.options.afterCreateCell(this, b)
        },
        _addColHandler: function(a, b) {
            var c = this.persist,
            e = this.findCell(a, b);
            this.options.thArray.splice(b + 1, 0, this.options.minColWidth);
            var r = this.getCellIndex(e).split(this.options.separator);
            a = ~~r[0];
            b = ~~r[1];
            for (var r = [a, b], n = null, l = 0; l < c.storage.length; l++) {
                var m = !1,
                q = c.storage[l][b];
                null === n && (n = b + e.colSpan);
                if (q) {
                    if (q.colSpan + b < n) {
                        for (m = 0; m < c.storage[l].length; m++) if (c.storage[l][m] && c.storage[l][m].colSpan + m >= n) {
                            q = c.storage[l][m];
                            b = m;
                            break
                        }
                        m = q.colSpan + b > n ? !0 : !1
                    } else q.colSpan + b > n && (m = !0);
                    if (!1 === m) {
                        if (m = d.createElement(q.tagName.toLowerCase()), this.nextSibling(q) ? q.parentNode.insertBefore(m, this.nextSibling(q)) : q.parentNode.appendChild(m), this.options.afterCreateCell(this, h(m)), c.storage[l].splice(n, 0, m), 1 < q.rowSpan) {
                            for (var p = null,
                            v = 1; v < q.rowSpan; v++) {
                                var m = d.createElement(q.tagName.toLowerCase()),
                                p = p ? this.nextRow(p) : this.nextRow(q.parentNode),
                                s = n - 1;
                                if (0 <= s) for (; ! c.storage[l + v][s] && !(s--, 0 > s););
                                c.storage[l + v][s] ? this.nextSibling(c.storage[l + v][s]) ? p.insertBefore(m, this.nextSibling(c.storage[l + v][s])) : p.appendChild(m) : this.firstChild(p) ? p.insertBefore(m, this.firstChild(p)) : p.appendChild(m);
                                this.options.afterCreateCell(this, h(m));
                                c.storage[l + v].splice(n, 0, m)
                            }
                            l += q.rowSpan - 1
                        }
                    } else {
                        c.storage[l].splice(n, 0, null);
                        if (1 < q.rowSpan) {
                            for (v = 1; v < q.rowSpan; v++) c.storage[l + v].splice(n, 0, null);
                            l += q.rowSpan - 1
                        }
                        q.colSpan++
                    }
                } else {
                    q = b;
                    if (0 <= q) for (; ! c.storage[l][q] && !(q--, 0 > q););
                    if (c.storage[l][q]) {
                        if (q === parseInt(r[1])) for (p = null, v = 0; v < c.storage[l][q].rowSpan; v++) {
                            0 === v ? p = c.storage[l][q].parentNode: p && (p = this.nextRow(p));
                            m = d.createElement(c.storage[l][q].tagName.toLowerCase());
                            if (0 === v) this.nextSibling(c.storage[l + v][q]) ? p.insertBefore(m, this.nextSibling(c.storage[l + v][q])) : p.appendChild(m);
                            else {
                                s = q;
                                if (0 < s) for (; ! c.storage[l + v][s] && !(s--, 0 > s););
                                c.storage[l + v][s] ? TableUtils.nextSibling(c.storage[l + v][s]) ? p.insertBefore(m, this.nextSibling(c.storage[l + v][s])) : p.appendChild(m) : this.firstChild(p) ? p.insertBefore(m, this.firstChild(p)) : p.appendChild(m)
                            }
                            this.options.afterCreateCell(this, h(m));
                            c.storage[l + v].splice(q + c.storage[l][q].colSpan, 0, m)
                        } else {
                            c.storage[l].splice(n, 0, null);
                            if (1 < c.storage[l][q].rowSpan) for (v = 1; v < c.storage[l][q].rowSpan; v++) c.storage[l + v].splice(n, 0, null);
                            c.storage[l][q].colSpan++
                        }
                        l += c.storage[l][q].rowSpan - 1
                    }
                }
            }
        },
        addRow: function() {
            var a = this.persist;
            if (!this.options.beforeChangeCell(this, this.persist.selected)) return ! 1;
            a.selection && 0 < a.selection.length ? (a = this._selectionTrans2ArrayStack(), a = this.index2Obj(a[a.length - 1][0]), this._addRowHandler(a.y, a.x)) : this._addLastRowHandler();
            this.options.rows++
        },
        _addLastRowHandler: function() {
            for (var a = d.createElement("tr"), b = [], c = this.options.cols, e = 0; e < c; e++) {
                var h = d.createElement("td");
                a.appendChild(h);
                b.push(h)
            }
            this.persist.storage.push(b);
            this.$table.find("tbody")[0].appendChild(a);
            this.options.afterCreateCell(this, b)
        },
        _addRowHandler: function(a, b) {
            var c = this.persist,
            e = this.findCell(a, b),
            r = c.storage.length,
            n = c.storage[a].length,
            l = [[]],
            m = d.createElement(e.parentNode.tagName.toLowerCase());
            this.nextRow(e.parentNode) ? a === r - 1 ? e.parentNode.parentNode.appendChild(m) : e.parentNode.parentNode.insertBefore(m, this.getRow(a + 1)) : e.parentNode.parentNode.appendChild(m);
            if (a === r - 1) {
                for (r = 0; r < n; r++) {
                    var q = d.createElement(e.tagName.toLowerCase());
                    m.appendChild(q);
                    this.options.afterCreateCell(this, h(q));
                    l[0][r] = q
                }
                c.storage = c.storage.concat(l)
            } else {
                for (r = 0; r < c.storage[a].length; r++) if (c.storage[a][r]) if (1 < c.storage[a][r].rowSpan) {
                    if (l[0][r] = null, c.storage[a][r].rowSpan++, 1 < c.storage[a][r].colSpan) {
                        for (n = 1; n < c.storage[a][r].colSpan; n++) l[0][r + n] = null;
                        r += c.storage[a][r].colSpan - 1
                    }
                } else {
                    if (q = d.createElement(e.tagName.toLowerCase()), m.appendChild(q), this.options.afterCreateCell(this, h(q)), l[0][r] = q, 1 < c.storage[a][r].colSpan) {
                        for (n = 1; n < c.storage[a][r].colSpan; n++) q = d.createElement(e.tagName.toLowerCase()),
                        m.appendChild(q),
                        this.options.afterCreateCell(this, h(q)),
                        l[0][r + n] = q;
                        r += c.storage[a][r].colSpan - 1
                    }
                } else {
                    l[0][r] = null;
                    for (var p = a; ! c.storage[p][r];) p--;
                    if (c.storage[p][r].rowSpan + p - 1 === a) {
                        if (q = d.createElement(e.tagName.toLowerCase()), m.appendChild(q), l[0][r] = q, this.options.afterCreateCell(this, h(q)), 1 < c.storage[p][r].colSpan) {
                            for (n = 1; n < c.storage[p][r].colSpan; n++) q = d.createElement(e.tagName.toLowerCase()),
                            m.appendChild(q),
                            this.options.afterCreateCell(this, h(q)),
                            l[0][r + n] = q;
                            r += c.storage[p][r].colSpan - 1
                        }
                    } else if (c.storage[p][r].rowSpan++, 1 < c.storage[p][r].colSpan) {
                        for (n = 1; n < c.storage[p][r].colSpan; n++) l[0][r + n] = null;
                        r += c.storage[p][r].colSpan - 1
                    }
                }
                c.storage.splice(a + 1, 0, l[0])
            }
        },
        resizable: function(a) {
            var b = this;
            b.$table.find("th").resizable({
                handles: "e",
                minWidth: b.options.minColWidth,
                maxWidth: a,
                stop: function(a, c) {
                    b.options.thArray[c.element.index()] = c.size.width;
                    b.options.afterChangeWidth(b, b.options.thArray)
                }
            })
        },
        _selectionTrans2ArrayStack: function(a) {
            a = a ? a: this.persist.selection;
            for (var b = [], c = 0; c < a.length; c++) {
                var d = a[c].split(this.options.separator)[0];
                b[d] || (b[d] = []);
                b[d].push(a[c])
            }
            a = [];
            for(var d=0;d<b.length;d++){
            	if(b[d] != "" && typeof(b[d]) != "undefined"){
                    a[d]=b[d];
            	}else{
            		b.splice(d,1);
                    d= d-1;
            	}
            }
            return a;
        },
        getRowIndex: function(a) {
            for (var b = a.parent().children(), c = 0; c < b.length; c++) if (b[c] == a[0]) return c;
        },
        getCellIndex: function(a) {
            var b = this.persist,
            c = this.getRowIndex(h(a).parent());
            if (b.storage[c]) for (var d = 0; d < b.storage[c].length; d++) if (a == b.storage[c][d]) return c + this.options.separator + d;
        },
        nextRow: function(a) {
            for (var b = this.getTableRows(), c = 0, d = 0; d < b.length; d++) if (b[d] === a) {
                c = d;
                break;
            }
            return b[c + 1] ? b[c + 1] : null;
        },
        findCell: function(a, b) {
            var c = this.persist,
            d = c.storage[a][b];
            if (!d) {
                var e = a;
                a: for (; 0 <= e; e--) {
                    var h = b;
                    b: for (; 0 <= h; h--) if (c.storage[e][h]) {
                        var h = c.storage[e][h],
                        l = h.colSpan,
                        m = h.rowSpan,
                        q = this.getCellIndex(h).split(this.options.separator);
                        if (~~q[1] + l - 1 >= b && ~~q[0] + m - 1 >= a) {
                            d = h;
                            break a
                        } else break b
                    }
                }
            }
            return d
        },
        getPreviousSiblingStorageElementNotNull: function(a, b) {
            var c = this.persist,
            d = b - 1;
            if (0 <= d) for (; ! c.storage[a][d] && !(d--, 0 > d););
            return c.storage[a][d]
        },
        nextSibling: function(a) {
            return a.nextElementSibling || a.nextSibling
        },
        firstChild: function(a) {
            return a.firstElementChild || a.firstChild
        },
        getRow: function(a) {
            return this.getTableRows()[a]
        },
        getTableRows: function() {
            return this.$element.find("tbody tr")
        },
        index2Obj: function(a) {
            return a ? (a = a.split(this.options.separator), {
                y: parseInt(a[0]),
                x: parseInt(a[1])
            }) : null
        }
    };
    h.fn.table = function(c) {
        return (new a(this, c)).init()
    }
})(jQuery, window, document);
/*********************************************************************************************************************************************************************************************/
(function(h) {
    var e = function(d, c) {
        this.$element = h(d);
        this.before = c.before || this.before;
        this.onItem = c.onItem || this.onItem;
        this.scopes = c.scopes || null;
        c.target && this.$element.data("target", c.target);
        this.listen()
    };
    e.prototype = {
        constructor: e,
        show: function(d) {
            var c, a, f = {
                relatedTarget: this,
                target: d.currentTarget
            };
            if (!this.isDisabled() && (this.closemenu(), !1 !== this.before.call(this, d, h(d.currentTarget)))) return c = this.getMenu(),
            c.trigger(h.Event("show.bs.context", f)),
            a = this.getPosition(d, c),
            c.attr("style", "").css(a).addClass("open").on("click.context.data-api", "li:not(.divider)", h.proxy(this.onItem, this, h(d.currentTarget))).trigger("shown.bs.context", f),
            c.find("ul").show(),
            h("html").on("click.context.data-api", c.selector, h.proxy(this.closemenu, this)),
            !1
        },
        closemenu: function(d) {
            var c;
            d = this.getMenu();
            d.hasClass("open") && (c = {
                relatedTarget: this
            },
            d.trigger(h.Event("hide.bs.context", c)), d.removeClass("open").off("click.context.data-api", "li:not(.divider)").trigger("hidden.bs.context", c), d.find("ul").hide(), h("html").off("click.context.data-api", d.selector))
        },
        keydown: function(d) {
            27 == d.which && this.closemenu(d)
        },
        before: function(d) {
            return ! 0
        },
        onItem: function(d) {
            return ! 0
        },
        listen: function() {
            this.$element.on("contextmenu.context.data-api", this.scopes, h.proxy(this.show, this));
            h("html").on("click.context.data-api", h.proxy(this.closemenu, this));
            h("html").on("keydown.context.data-api", h.proxy(this.keydown, this));
            h("html").on("mousedown.context.data-api", h.proxy(this.mousedown, this))
        },
        mousedown: function(d) {
        	//解决拖拽按钮拖动表格变换位置，菜单多个显示
            0 == h(d.target).closest(".table_layout_js").length || 0<h(d.target).closest(".form_layout_toolbar").length&&this.closemenu(d)
        },
        destroy: function() {
            this.$element.off(".context.data-api").removeData("context");
            h("html").off(".context.data-api")
        },
        isDisabled: function() {
            return this.$element.hasClass("disabled") || this.$element.attr("disabled")
        },
        getMenu: function() {
            var d = this.$element.data("target"),
            c;
            d || (d = (d = this.$element.attr("href")) && d.replace(/.*(?=#[^\s]*$)/, ""));
            return (c = h(d)) && c.length ? c: this.$element.find(d)
        },
        getPosition: function(d, c) {
            var a = d.clientX,
            f = d.clientY,
            b = h(window).width(),
            e = h(window).height(),
            k = c.find(".dropdown-menu").outerWidth(),
            r = c.find(".dropdown-menu").outerHeight(),
            f = f + r > e ? {
                top: f - r + h(window).scrollTop()
            }: {
                top: f + h(window).scrollTop()
            },
            a = a + k > b && 0 < a - k ? {
                left: a - k + h(window).scrollLeft()
            }: {
                left: a + h(window).scrollLeft()
            },
            b = c.offsetParent().offset();
            a.left -= b.left;
            f.top -= b.top;
            return h.extend({
                position: "absolute",
                "z-index": 9999
            },
            f, a)
        }
    };
    h.fn.contextmenu = function(d, c) {
        return this.each(function() {
            var a = h(this),
            f = a.data("context"),
            b = "object" == typeof d && d;
            f || a.data("context", f = new e(a, b));
            "string" == typeof d && f[d].call(f, c)
        })
    };
    h.fn.contextmenu.Constructor = e;
    h(document).on("contextmenu.context.data-api",
    function() {
        h('[data-toggle\x3d"context"]').each(function() {
            var d = h(this).data("context");
            d && d.closemenu()
        })
    }).on("contextmenu.context.data-api", '[data-toggle\x3d"context"]',
    function(d) {
        h(this).contextmenu("show", d);
        d.preventDefault();
        d.stopPropagation()
    })
})(jQuery)
});