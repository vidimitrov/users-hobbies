import React, { useState, useCallback, useEffect, useRef } from "react";

interface TableProps {
  headers: string[];
  tableContent: any;
  minCellWidth?: number;
}

interface MappedHeader {
  text: string,
  ref: React.MutableRefObject<HTMLTableColElement | undefined>
}

const createHeaders = (headers: string[]): MappedHeader[] => {
  return headers.map((item) => ({
    text: item,
    ref: useRef<HTMLTableColElement>()
  }));
};

const ResizableTable: React.FC<TableProps> = ({
  headers,
  tableContent,
  minCellWidth = 150
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const tableElement = useRef<HTMLTableElement>(null);
  const columns = createHeaders(headers);

  const mouseDown = (index: number) => {
    setActiveIndex(index);
  };

  const mouseMove = useCallback(
    (e) => {
      const gridColumns = columns.map((col, i) => {
        if (i === activeIndex) {
          if (col && col.ref && col.ref.current) {
            const width = e.clientX - col.ref.current.offsetLeft;

            if (width >= minCellWidth) {
              return `${width}px`;
            }
          }
        }

        if (col && col.ref && col.ref.current) {
          return `${col.ref.current.offsetWidth}px`;
        }

        return null;
      });

      const tElement = tableElement && tableElement.current;

      if (tElement) {
        tElement.style.gridTemplateColumns = `${gridColumns.join(
          " "
        )}`;
      }
    },
    [activeIndex, columns, minCellWidth]
  );

  const removeListeners = useCallback(() => {
    window.removeEventListener("mousemove", mouseMove);
    window.removeEventListener("mouseup", removeListeners);
  }, [mouseMove]);

  const mouseUp = useCallback(() => {
    setActiveIndex(null);
    removeListeners();
  }, [setActiveIndex, removeListeners]);

  useEffect(() => {
    if (activeIndex !== null) {
      window.addEventListener("mousemove", mouseMove);
      window.addEventListener("mouseup", mouseUp);
    }

    return () => {
      removeListeners();
    };
  }, [activeIndex, mouseMove, mouseUp, removeListeners]);

  return (
    <div className="container">
      <div className="table-wrapper">
        <table className="resizeable-table" ref={tableElement}>
          <thead>
            <tr>
              {columns.map(({ ref, text }, i) => (
                <th ref={ref as any} key={text}>
                  <span>{text}</span>
                  <div
                    onMouseDown={() => mouseDown(i)}
                    className={`resize-handle ${
                      activeIndex === i ? "active" : "idle"
                    }`}
                  />
                </th>
              ))}
            </tr>
          </thead>
          {tableContent}
        </table>
      </div>
    </div>
  );
};

export default ResizableTable;
