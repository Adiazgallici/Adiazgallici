import sys, glob, os
from PIL import Image
d=sys.argv[1]
fs=sorted(glob.glob(d+'/frames/f*.png'))
ims=[Image.open(f).convert('RGB') for f in fs]
ref=Image.new('RGB',(ims[0].width,ims[0].height*2)); ref.paste(ims[-1],(0,0)); ref.paste(ims[len(ims)//3],(0,ims[0].height))
pal=ref.quantize(colors=96, method=Image.Quantize.MEDIANCUT)
q=[im.quantize(palette=pal, dither=Image.Dither.NONE) for im in ims]
dur=[700]+[45]*(len(q)-2)+[6500]
q[0].save(d+'/out/cyber-banner.gif', save_all=True, append_images=q[1:], duration=dur, loop=0, optimize=True, disposal=1)
ims[-1].save(d+'/out/cyber-banner-final.png'); ims[16].save(d+'/out/cyber-banner-mid.png')
print(len(q),'frames', os.path.getsize(d+'/out/cyber-banner.gif')//1024,'KB', ims[0].size)
