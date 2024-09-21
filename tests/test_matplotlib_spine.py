import matplotlib.pyplot as plt

fig, ax = plt.subplots()

# 设置刻度和标签
ax.set_xlabel('X Label')
ax.set_ylabel('Y Label')

# 隐藏上和右侧的脊线
ax.spines['top'].set_color('none')
ax.spines['right'].set_color('green')

# 移动左边的脊线到数据区域内
ax.spines['left'].set_position(('data', 0))

# 反转 y 轴
ax.invert_yaxis()

plt.show()
