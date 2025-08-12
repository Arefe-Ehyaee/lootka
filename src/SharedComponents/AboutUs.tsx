import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import heroAboutUs from '../assets/images/photo_2025-05-18_17-27-08.jpg';
import balloon from "../assets/icons/hot-air-balloon.svg.svg";
import umb from "../assets/icons/div.featureCard__icon.svg";
import journey from "../assets/images/Group 2085663018.svg";
import lamp from "../assets/icons/Lamp - Iconly Pro.svg";
import medal from "../assets/icons/medal.svg.svg"

const AboutUs: React.FC = () => {
  return (
    <div className="min-h-screen min-w-screen font-myIranSansRegular bg-white text-gray-900">
      <Navbar />

      {/* Hero Section */}
      <div className="relative h-[600px]">
        <img
          src={heroAboutUs}
          alt="قایق‌های چوبی"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-center items-center text-white text-center space-y-4">
          <h1 className="text-5xl font-myIranSansMedium">لوتکا</h1>
          <p className="text-4xl font-myIranSansMedium">قایق چوبی ما،</p>
          <p className="text-4xl font-myIranSansMedium">راهِ تو به کشف نشده‌ها...</p>
        </div>
      </div>

      {/* Intro Section */}
      <section className="max-w-4xl mx-auto py-16 leading-8 text-justify">
        <h2 className="text-xl font-myIranSansMedium mb-6">معرفی لوتکا</h2>
        <p className='font-myIranSansRegular'>
          ما در لوتکا با یک رؤیا شروع کردیم، رؤیای دیدن ایران از دریچه‌ای تازه. از کوچه‌پس‌کوچه‌های رشت تا دل جنگل‌های ماسال، از بازارهای محلی گرفته تا اقامتگاه‌های بومی در دل روستاها. ما باور داریم که زیباترین تجربه‌ها در جاهایی نهفته‌اند که کمتر دیده شده‌اند. لوتکا یک قایق کوچک اما پرانرژی‌ست که از دل طبیعت گیلان به سفر درآمده تا مسیر تازه‌ای برای کشف ایران به شما نشان دهد. ما در لوتکا تلاش می‌کنیم تجربه سفر را برای شما ساده‌تر، لذت‌بخش‌تر و شخصی‌سازی‌شده‌تر کنیم. چه اهل گشت‌وگذار در دل جنگل‌های شمال باشید، چه به‌دنبال کافه‌ای دنج در دل یک کوچه‌ی قدیمی، یا اقامتی متفاوت در یک خانه بومی. لوتکا فقط یک راهنمای سفر نیست، بلکه یک همراه محلی‌ست که به شما کمک می‌کند جاهای نادیده را کشف کنید، طعم‌های فراموش‌شده را بچشید، و با آدم‌هایی آشنا شوید که قصه‌های شهرشان را زندگی کرده‌اند.
          ما با استفاده از هوش مصنوعی، پیشنهادهای سفر، تفریح، رستوران و اقامتگاه را بر اساس سلیقه و شخصیت هر کاربر شخصی‌سازی می‌کنیم تا تجربه‌ای منحصر‌به‌فرد و به‌یادماندنی برایتان بسازیم.

        </p>
      </section>

      {/* Why Lutka */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto text-right leading-8">
          <h2 className="text-xl font-myIranSansMedium mb-4">چرا لوتکا</h2>
          <p className='font-myIranSansRegular'>
            "لوتکا" در زبان گیلکی به معنای قایق چوبی کوچک است، نمادی از سفر آرام، اصیل و نزدیک به طبیعت. ما هم تلاش می‌کنیم سفری از جنس همین قایق برای شما بسازیم.
            آهسته، عمیق و در دل فرهنگ مردم.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto text-right leading-8">
          <h2 className="text-xl font-myIranSansMedium mb-4">ماموریت ما</h2>
          <p className='font-myIranSansRegular'>
            ماموریت ما ساده اما عمیق است. متصل کردن مسافران به تجربه‌های اصیل، محلی و فراموش‌نشدنی. فراهم کردن برنامه های سرگرمی و تفریحی شخصی سازی شده یکی از ماموریت های لوتکاست.
            ما به شما کمک می‌کنیم رستوران‌های محلی خاص، جاهای دیدنی کمتر شناخته‌شده، اقامتگاه‌های بومی و تفریح‌های منحصربه‌فرد را کشف کنید. همه از نگاه کسایی که اونجا زندگی می‌کنند و بومی هستند.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="bg-gray-50 py-12 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-xl font-myIranSansMedium mb-10">ارزش‌های ما</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div className="bg-white p-6 rounded-2xl shadow">
              <img src={balloon} alt="local" className="mx-auto"></img>
              <h3 className="text-lg font-myIranSansMedium mt-4 mb-2">بومی‌گرایی</h3>
              <p className="font-myIranSansRegular text-justify text-sm">لوتکا با تمرکز بر معرفی ریشه‌دارترین جلوه‌های محلی، تلاش می‌کند صدای کسب‌وکارهای کوچک و مردمی را به گوش گردشگران برساند. از اقامتگاه‌های بوم‌گردی گرفته تا غذاهای محلی و آیین‌های خاص هر منطقه، ما مسافران را به دل فرهنگ بومی می‌بریم تا سفر، رنگ و بویی اصیل و واقعی داشته باشد.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow">
              <img src={umb} alt="thumb" className="mx-auto"></img>
              <h3 className="text-lg font-myIranSansMedium mt-4 mb-2">تجربه‌محوری</h3>
              <p className="font-myIranSansRegular text-justify text-sm">در لوتکا، سفر فقط دیدن نیست، بلکه لمس زندگی واقعی‌ست. ما به شما کمک می‌کنیم تا از قاب دوربین فراتر بروید، با مردم محلی ارتباط بگیرید، طعم‌های بومی را بچشید و لحظاتی بسازید که در دل و ذهن‌تان ماندگار شوند.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow">
              <img src={lamp} alt="lamp" className="mx-auto"></img>
              <h3 className="text-lg font-myIranSansMedium mt-4 mb-2">نوآوری </h3>
              <p className="font-myIranSansRegular text-justify text-sm">لوتکا با کمک هوش مصنوعی و طراحی تجربه‌ی کاربری هوشمند، به کاربران پیشنهادهایی متناسب با علایقشان می‌دهد و در عین حال، کسب‌وکارهای کوچک محلی را در معرض دید طیف وسیعی از مخاطبان قرار می‌دهد. ما از تکنولوژی برای انسان‌تر کردن سفر استفاده می‌کنیم.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow">
              <img src={medal} alt="thumb" className="mx-auto"></img>
              <h3 className="text-lg font-myIranSansMedium mt-4 mb-2">صداقت و شفافیت </h3>
              <p className="font-myIranSansRegular text-justify text-sm">در لوتکا، اعتماد کاربران برای ما اولویت است. اطلاعات مکان‌ها با دقت جمع‌آوری و به‌روز می‌شوند، نظرات کاربران بدون فیلتر نمایش داده می‌شوند و هیچ تجربه‌ای بیش از واقعیت، بزک نمی‌شود. این شفافیت، لوتکا را به پلتفرمی قابل اتکا برای برنامه‌ریزی سفر تبدیل می‌کند.</p>
            </div>
          </div>
        </div>
      </section>



      <div className='text-center py-8'>
        <h6 className='font-myIranSansMedium text-lg'>داستان ما</h6>
        <h5 className='font-myIranSansRegular'>ما مسیری متفاوت برای خلق تجربه های نو را آغاز کرده ایم.</h5>

        <img src={journey} alt="" className='mx-auto mb-8 mt-12' />

        <div className='border rounded-lg bg-gray-50 border-gray-200 text-justify mx-auto font-myIranSansRegular px-6 py-4 mt-5 text-center w-[60%]'>

          <h6 className='font-myIranSansMedium text-center text-lg'>اولین جرقه یک ایده</h6>
          <p className='mt-2 text-center leading-8'>ماجرا از یک دغدغه ساده شروع شد:</p>
          <p className='text-center leading-8'>چرا بیشتر سفرهایمان شبیه به هم شده‌اند؟ چرا همیشه همان جاها، همان عکس‌ها، همان تجربه‌ها؟</p>
          <p className='text-center leading-8'>
            لوتکا با این سؤال‌ها متولد شد؛ با آرزوی ساختن سفری که بوی اصالت بدهد، رنگ فرهنگ بگیرد و صدای مردم محلی را بلندتر کند.
            ما یک تیم عاشق سفر، طبیعت و قصه‌های محلی هستیم. دوست داریم جاهایی را پیدا کنیم که در هیچ تور و بروشوری نیستند، کوچه‌های قدیمی، رستوران‌های گمنام، آدم‌های مهمان‌نواز و تجربه‌هایی که فقط با دل دیدن می‌شود لمس‌شان کرد.
            نام لوتکا از یک قایق چوبی گیلکی آمده؛ قایقی کوچک، اما پر از راه و ماجرا. همان‌طور که لوتکا، آرام در دل رودخانه حرکت می‌کند، ما هم با کمک تکنولوژی و عشق به بومی‌گرایی، شما را به سمت مقاصدی میبریم که کمتر دیده‌ شده‌اند، اما شایسته‌ی دیده‌ شدن‌اند.
            لوتکا، قایق چوبی ما؛ راه تو به جاهای نادیده.</p>
        </div>
      </div>

      <section className="py-12 px-6 font-myIranSansMedium">
        <div className="max-w-4xl mx-auto text-right leading-8">
          <p>آینده‌ای که دنبالشیم:</p>
          <p>
            ما می‌خوایم لوتکا تبدیل شه به مرجع تجربه‌های بومی و خاص سفر توی گیلان و بعد ایران. جایی که هر کسی بتونه با خیال راحت یه مقصد تازه، یه غذای متفاوت یا یه اقامت بومی کشف کنه. تجربه های متفاوتی داشته باشه. تفریحات مختلف رو خیلی راحت حتی تو شهر خودش پیدا کنه.</p>
        </div>
      </section>


      <section className="py-12 px-6 font-myIranSansMedium">
        <div className="max-w-4xl mx-auto text-right leading-8">
<p>لوتکا فقط یک پلتفرم نیست، یک دعوت است.</p>

به دیدن، چشیدن و لمس کردن زندگی واقعی در دل ایران.

<p className='mt-4'>
   با ما همراه شو!
</p>
اگه صاحب یه خونه بوم‌گردی، رستوران محلی، یا تجربه خاص هستی، یا حتی فقط یه عاشق سفر و کشف جاهای نادیده‌ای، جای تو توی لوتکا خالیه.

        </div>
      </section>


      <Footer />
    </div>
  );
};

export default AboutUs;
