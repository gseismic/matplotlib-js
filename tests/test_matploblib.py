import matplotlib.pyplot as plt
import numpy as np

"""
transData：用于绘制基于数据的图形元素（点、线等），根据实际数据的坐标定位图形元素。
transAxes：用于绘制与数据无关的图形元素或注释（如图例、文本、箭头等），基于 Axes 的相对位置进行定位。
transLimits：用于将数据坐标转换为轴限坐标，常用于设置轴限范围。
transScale：用于将数据坐标转换为比例坐标，常用于绘制比例图表。

与 transData 的配合：transScale 通常与 transData 配合使用。在数据绘制过程中，transScale 负责处理比例变换，而 transData 负责将变换后的数据映射到显示设备上。两者结合可以完成更复杂的坐标变换。


"""

def test_matplotlib_scale():
    fig, ax = plt.subplots()

    # 设置 y 轴为对数刻度
    ax.set_yscale('linear')
    ax.set_yscale('log')

    # 绘制一条直线
    ax.plot([1, 2, 3], [1, 10, 100])

    # 使用 transScale 将数据坐标转换为比例坐标
    scale_coords = ax.transScale.transform((2, 10))
    print(f"Data (2, 10) in scale coordinates: {scale_coords}")

    
def test_matplotlib_transLimits():
    fig, ax = plt.subplots()

    ax.set_xlim(0, 2)
    ax.set_ylim(0, 1)
    # 绘制一条直线
    ax.plot([0, 1], [0, 1])

    # 获取当前坐标轴的限制
    print(f"xlim: {ax.get_xlim()}, ylim: {ax.get_ylim()}")

    # 使用 transLimits 将数据坐标转换为轴限坐标
    limit_coords = ax.transLimits.transform((1, 1))
    print(f"Data (0.5, 0.5) in limit coordinates: {limit_coords}")

def test_matplotlib_transData():
    fig, ax = plt.subplots()

    ax.set_xlim(0, 2)
    ax.set_ylim(0, 2)
    # 绘制一条直线
    ax.plot([0, 1], [0, 1])
    # 使用 transData 将数据坐标转换为轴限坐标
    phy_coords = ax.transData.transform((1, 1))
    print(f"Data (1, 1) in physical coordinates: {phy_coords}")

    data_coords = ax.transData.inverted().transform(phy_coords)
    print(f"Physical {phy_coords} in data coordinates: {data_coords}")
    assert np.allclose(data_coords, (1, 1))
    
    # Axes坐标系是基于 Axes 容器的相对坐标系，范围始终是固定的 (0, 0) 到 (1, 1)。
    # (0, 0) 代表 Axes 的左下角，(1, 1) 代表 Axes 的右上角。
    # 无论坐标轴范围如何变化，transAxes 始终按照相对位置定位。
    axes_coords = ax.transAxes.transform((1, 1)) # 
    print(f"Axes (1, 1) in axes coordinates: {axes_coords}")

    # ax.transLimits.transform 数据坐标转为轴限坐标 
    limit_coords = ax.transLimits.transform((1, 1))
    print(f"Data (1, 1) in limit coordinates: {limit_coords}")
    print(f'{ax.transLimits.inverted().transform(limit_coords)=}')   

def test_matplotlib_transAxes():
    fig, ax = plt.subplots()

    # 绘制线性图
    ax.plot([0, 10], [0, 10])
    # 在 Axes 坐标 (0.5, 0.5) 添加文本，表示 Axes 的中心
    ax.text(0.5, 0.5, 'Center of Axes', transform=ax.transAxes)


if __name__ == "__main__":
    if 0:
        test_matplotlib_scale()
    if 0:
        test_matplotlib_transLimits()
    if 1:
        test_matplotlib_transData()
    if 0:
        test_matplotlib_transAxes()
        
    plt.show()
