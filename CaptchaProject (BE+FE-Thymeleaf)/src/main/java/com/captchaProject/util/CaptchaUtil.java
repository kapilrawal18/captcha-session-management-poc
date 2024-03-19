package com.captchaProject.util;

import cn.apiclub.captcha.Captcha;
import cn.apiclub.captcha.backgrounds.GradiatedBackgroundProducer;
import cn.apiclub.captcha.noise.CurvedLineNoiseProducer;
import cn.apiclub.captcha.text.producer.DefaultTextProducer;
import cn.apiclub.captcha.text.renderer.DefaultWordRenderer;
import lombok.extern.slf4j.Slf4j;

import javax.imageio.ImageIO;
import java.io.ByteArrayOutputStream;
import java.util.Base64;

@Slf4j
public class CaptchaUtil {

    // Captcha object creation.
    public static Captcha createCaptcha(Integer width, Integer height) {
        return new Captcha.Builder(width, height)
                .addBackground(new GradiatedBackgroundProducer())
                .addText(new DefaultTextProducer(), new DefaultWordRenderer())
                .addNoise(new CurvedLineNoiseProducer())
                .build();
    }

    // Converting captcha to Binary string.
    public static String encodeCaptcha(Captcha  captcha) {
        String image = null;
        try {
            ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
            ImageIO.write(captcha.getImage(), "jpg", byteArrayOutputStream);
            byte [] byteArray = Base64.getEncoder().encode(byteArrayOutputStream.toByteArray());
            image = new String(byteArray);
        } catch (Exception exception) {
            log.error("Exception occurred !!!", exception);
        }
        return image;
    }
}
